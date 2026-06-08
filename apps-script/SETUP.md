# RSVP -> Google Sheet setup

No API keys, no credentials in the codebase. The Apps Script runs under *your*
Google account; the site just POSTs JSON to a public web-app URL.

## Steps

1. Go to https://sheets.new — create a blank Google Sheet. Name it anything
   (e.g. "Wedding RSVPs"). You don't need to add columns; the script does it.

2. In that sheet: **Extensions -> Apps Script**.

3. Delete the default `function myFunction(){}` and paste the contents of
   [`Code.gs`](Code.gs). Click the disk icon to save.

4. **Deploy -> New deployment**.
   - Click the gear -> **Web app**.
   - **Description:** anything.
   - **Execute as:** Me (your account).
   - **Who has access:** **Anyone**.
   - **Deploy**. Approve the permission prompt (it's your own script writing to
     your own sheet — "Advanced -> Go to <project> (unsafe)" is normal for
     personal scripts).

5. Copy the **Web app URL** — it ends in `/exec`. Looks like:
   `https://script.google.com/macros/s/AKfy.....長/exec`

6. Paste that URL into `public/js/script.js`:
   ```js
   var RSVP_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec';
   ```
   Commit + push. Done — submissions append a row to the **RSVPs** tab.

## Test

- Open the `/exec` URL in a browser: should show `{"ok":true,"msg":"RSVP endpoint live"}`.
- Submit the form on the site: a new row appears in the sheet within ~1s.

## Notes

- Every RSVP is also saved in the browser's `localStorage` as a backup, so
  nothing is lost if the network call fails.
- To change the columns, edit `appendRow([...])` and the header row in `Code.gs`,
  then **Deploy -> Manage deployments -> Edit -> New version**.
- If you ever rotate the URL, just update `RSVP_ENDPOINT` and re-push.
