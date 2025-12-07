import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, transferLast5 } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A:C",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }), // 報名時間
            name,
            transferLast5
          ],
        ],
      },
    });

    res.status(200).json({ ok: true });

  } catch (error) {
    console.error("寫入 Google Sheet 失敗：", error);
    res.status(500).json({ error: "Failed to write sheet" });
  }
}
