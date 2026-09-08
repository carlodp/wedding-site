# RSVP backend (Google Sheets + Apps Script)

This replaces RSVPify entirely — the guest list lives in a Google Sheet you control, and this Apps
Script is the small API the site's RSVP section talks to. No embed, no third-party styling.

## 1. Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Rename the first tab (double-click it at the bottom) to exactly `Guest List` — the script looks for
   this exact name.
3. File → Import → Upload → select `guest-list-template.csv` → Import location: **Replace current
   sheet**.
4. Replace the two example rows with your real guest list. Column meanings:
   - `HouseholdID` — just a human-readable label for your own reference; the script actually matches
     guests by their row position, so this column can be blank, duplicated, or whatever you like
     without affecting anything.
   - `Members` — full names exactly as guests should type them, comma-separated if more than one
     person is invited together (e.g. a couple or family under one invite).
   - `Emails` — optional, comma-separated, same order doesn't need to match Members. Lets guests type
     an email instead of their name.
   - `PlusOneAllowed` — `TRUE` or `FALSE`.
   - Leave `AttendingChurch`, `AttendingReception`, `AttendingMembers`, `PlusOneName`, `DietaryNotes`,
     `RespondedAt` blank — the site fills these in when a guest RSVPs.

## 2. Create the Apps Script project

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete whatever's in the default `Code.gs` file and paste in the contents of this folder's
   `Code.gs`.
3. Save the project (give it a name like "Wedding RSVP API").

## 3. Deploy it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Set **Execute as: Me**, **Who has access: Anyone**.
4. Click **Deploy**.
5. Google will show an "authorize access" prompt — this is normal for a personal script accessing
   your own Sheet. Click through: **Advanced → Go to [project name] (unsafe) → Allow**. It's only
   "unsafe" in the sense that Google hasn't manually reviewed it, same as any script you write yourself.
6. Copy the **Web app URL** — it ends in `/exec`. Send this to me so I can wire it into the site.

## Testing before wiring up the site

- In the Apps Script editor, select `test_lookupKnownGuest` or `test_lookupUnknownGuest` from the
  function dropdown and click **Run**, then check **Executions** (left sidebar) or **View → Logs** for
  the output. `test_lookupKnownGuest` expects a guest named "Ana Reyes" to exist — edit it to match a
  real name on your list, or leave the example row in place while testing.
- Once deployed, you can also visit `<your web app URL>?action=lookup&query=Some Name` directly in a
  browser to see the raw JSON response.

## If you edit Code.gs later

Apps Script deployments are frozen snapshots — editing the script does **not** update the live `/exec`
URL by itself. After changing anything, go to **Deploy → Manage deployments**, click the pencil icon on
the existing deployment, and choose **New version** under Version, then **Deploy**. The URL stays the
same either way.
