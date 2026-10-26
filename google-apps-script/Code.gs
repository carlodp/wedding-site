const SHEET_NAME = "Guest List";

function doGet(e) {
  const action = e.parameter.action;
  if (action === "lookup") {
    return respond(lookupGuest(e.parameter.name || e.parameter.query || ""));
  }
  if (action === "names") {
    return respond(getAllNames());
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
  if (v === true || (typeof v === "string" && v.toUpperCase() === "TRUE")) return "Yes";
  if (v === false || (typeof v === "string" && v.toUpperCase() === "FALSE")) return "No";
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
    const matched = members.some((m) => normalize(m) === q);
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
      const attendingMems = splitList(row[idx.AttendingMembers]);
      const rawAttending = ynString(idx.Attending !== undefined ? row[idx.Attending] : "");
      // Fall back to AttendingMembers presence if Attending column is missing/empty
      const attendingVal = rawAttending === "Yes" || rawAttending === "No"
        ? rawAttending
        : attendingMems.length > 0 ? "Yes" : "No";
      result.saved = {
        attending: attendingVal,
        attendingMembers: attendingMems,
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

    setCol("Attending", data.attending === "Yes" ? "Yes" : "No");
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

function getAllNames() {
  const sheet = getSheet();
  const headers = getHeaders(sheet);
  const idx = headerIndex(headers);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { names: [] };
  const rows = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  const names = [];
  const seen = new Set();
  rows.forEach(row => {
    splitList(row[idx.Members]).forEach(name => {
      if (name && !seen.has(name)) { names.push(name); seen.add(name); }
    });
  });
  return { names };
}

function test_lookupKnownGuest() {
  Logger.log(JSON.stringify(lookupGuest("Ana Reyes")));
}

function test_lookupUnknownGuest() {
  Logger.log(JSON.stringify(lookupGuest("Nobody Here")));
}

function test_getAllNames() {
  Logger.log(JSON.stringify(getAllNames()));
}
