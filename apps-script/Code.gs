/**
 * RSVP -> Google Sheet
 * Receives a POST from the wedding site and appends one row per RSVP.
 * Deploy: Apps Script editor -> Deploy -> New deployment -> Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the /exec URL into RSVP_ENDPOINT in public/js/script.js.
 */

var SHEET_NAME = 'RSVPs';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // serialize writes so rows never collide
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    sheet.appendRow([
      new Date(),                       // received (server time)
      data.at || '',                    // submitted (client ISO)
      data.name || '',                  // lead name
      data.attending || '',             // yes / no
      data.joinFrom || '',              // house / church / hall
      data.guests || 0,                 // guest count
      (data.names || []).join(', '),    // all guest names
      data.notes || ''                  // notes / dietary
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// optional: open the /exec URL in a browser to confirm it's live
function doGet() {
  return json_({ ok: true, msg: 'RSVP endpoint live' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Received', 'Submitted', 'Name', 'Attending',
      'Joining From', 'Guests', 'Guest Names', 'Notes'
    ]);
    sheet.getRange('A1:H1').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
