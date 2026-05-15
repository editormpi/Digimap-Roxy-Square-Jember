/**
 * CARA SETUP GOOGLE SHEETS EXPORT
 * =================================
 * 1. Buka sheet target di Google Sheets.
 * 2. Menu: Extensions > Apps Script.
 * 3. Copy seluruh isi file ini ke editor Apps Script (Code.gs).
 * 4. Klik Deploy > New deployment > Type: Web app.
 *    - Description: Digimap Export
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Klik Deploy, lalu izinkan akses Google Anda.
 * 6. Copy "Web app URL" yang muncul (berakhiran /exec).
 * 7. Di aplikasi Digimap > tab Admin > tombol "Kirim ke Google Sheet",
 *    paste URL tersebut saat diminta. URL akan disimpan di browser.
 *
 * Catatan: setiap kirim akan menimpa sheet "Penjualan".
 */

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const rows = payload.rows || [];
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Penjualan');
    if (!sheet) sheet = ss.insertSheet('Penjualan');
    sheet.clear();

    if (rows.length === 0) {
      sheet.getRange(1, 1).setValue('Tidak ada data');
      return ContentService.createTextOutput(JSON.stringify({ ok: true, count: 0 }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const headers = Object.keys(rows[0]);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    const values = rows.map(r => headers.map(h => r[h]));
    sheet.getRange(2, 1, values.length, headers.length).setValues(values);
    sheet.autoResizeColumns(1, headers.length);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, count: rows.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Digimap export endpoint. Use POST.');
}
