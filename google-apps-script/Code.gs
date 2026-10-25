const SHEET_NAME = "Guest List";

function doGet(e) {
  const action = e.parameter.action;
  if (action === "lookup") {
    return respond(lookupGuest(e.parameter.name || e.parameter.query || ""));
  }
  if (action === "suggest") {
    return respond(suggestGuests(e.parameter.q || e.parameter.name || ""));
  }
  return respond({ error: "Unknown action" });
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return respond({ error: "Bad request" });
  }
  if (data.action === "submit") {
    return respond(submitRsvp(data));
  }
  return respond({ error: "Unknown action" });
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function getHeaders(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalize(s) {
  return String(s || "").trim().toLowerCase();
}

function ynString(v) {
  if (v === true) return "Yes";
  if (v === false) return "No";
  return v || "";
}

function headerIndex(headers) {
  const idx = {};
  headers.forEach((h, i) => { idx[h] = i; });
  return idx;
}

function lookupGuest(query) {
  const q = normalize(query);
  if (!q) return { found: false };

  const sheet = getSheet();
  const headers = getHeaders(sheet);
  const idx = headerIndex(headers);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { found: false };
  const rows = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    const members = splitList(row[idx.Members]);
    const emails = splitList(row[idx.Emails]);
    const matched =
      members.some((m) => normalize(m) === q) ||
      emails.some((em) => normalize(em) === q);
    if (!matched) continue;

    const respondedAt = row[idx.RespondedAt];
    const alreadyResponded = !!respondedAt;
    const result = {
      found: true,
      householdId: r + 2,
      members: members,
      plusOneAllowed: String(row[idx.PlusOneAllowed]).toUpperCase() === "TRUE",
      alreadyResponded: alreadyResponded,
    };
    if (alreadyResponded) {
      result.saved = {
        attendingChurch: ynString(row[idx.AttendingChurch]),
        attendingReception: ynString(row[idx.AttendingReception]),
        attendingMembers: splitList(row[idx.AttendingMembers]),
        plusOneName: row[idx.PlusOneName] || "",
      };
    }
    return result;
  }
  return { found: false };
}

function submitRsvp(data) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet();
    const headers = getHeaders(sheet);
    const idx = headerIndex(headers);
    const lastRow = sheet.getLastRow();

    const targetRow = parseInt(data.householdId, 10);
    if (!targetRow || targetRow < 2 || targetRow > lastRow) {
      return { ok: false, error: "Household not found" };
    }

    const setCol = (name, value) => {
      if (idx[name] === undefined) return;
      sheet.getRange(targetRow, idx[name] + 1).setValue(value);
    };

    setCol("AttendingChurch", data.attendingChurch === "Yes");
    setCol("AttendingReception", data.attendingReception === "Yes");
    setCol(
      "AttendingMembers",
      Array.isArray(data.attendingMembers) ? data.attendingMembers.join(", ") : (data.attendingMembers || "")
    );
    setCol("PlusOneName", data.plusOneName || "");
    setCol("RespondedAt", new Date());

    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function suggestGuests(query) {
  const q = normalize(query);
  if (q.length < 2) return { suggestions: [] };

  const qTokens = q.split(/\s+/).filter(t => t.length > 1);
  if (!qTokens.length) return { suggestions: [] };

  const sheet = getSheet();
  const headers = getHeaders(sheet);
  const idx = headerIndex(headers);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { suggestions: [] };

  const rows = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  const scored = [];
  const seen = new Set();

  for (let r = 0; r < rows.length; r++) {
    const members = splitList(rows[r][idx.Members]);
    members.forEach(name => {
      if (seen.has(name)) return;
      const norm = normalize(name);
      if (norm === q) return; // exact match handled by lookup
      const nTokens = norm.split(/\s+/).filter(t => t.length > 1);

      // count how many query tokens appear (substring) in name tokens and vice versa
      const qHits = qTokens.filter(qt => nTokens.some(nt => nt.includes(qt) || qt.includes(nt))).length;
      const nHits = nTokens.filter(nt => qTokens.some(qt => qt.includes(nt) || nt.includes(qt))).length;

      const score = (qHits / qTokens.length) + (nHits / nTokens.length);
      if (score >= 0.8) {
        scored.push({ name, score });
        seen.add(name);
      }
    });
  }

  scored.sort((a, b) => b.score - a.score);
  return { suggestions: scored.slice(0, 5).map(s => s.name) };
}

function test_lookupKnownGuest() {
  Logger.log(JSON.stringify(lookupGuest("Ana Reyes")));
}

function test_lookupUnknownGuest() {
  Logger.log(JSON.stringify(lookupGuest("Nobody Here")));
}

function test_suggestGuests() {
  Logger.log(JSON.stringify(suggestGuests("Carlo Santos")));
}
