import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

// 🔐 讀取環境變數
const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SERVICE_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
    }

  try {
    const { name, sex, birthday, phone, note } = req.body;

    // ---------------------------
    // 1️⃣ Google Sheet 連線
    // ---------------------------
    const auth = new google.auth.JWT(
      SERVICE_EMAIL,
      undefined,
      PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    // ---------------------------
    // 2️⃣ 寫入 Google Sheet
    // ---------------------------
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: '報名表!A:F', // A~F = 六欄
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          name,
          sex,
          birthday,
          phone,
          note,
          new Date().toLocaleString("zh-TW") // 時間戳記
        ]],
      },
    });

    // ---------------------------
    // 3️⃣ 回傳前端（無肯定句）
    // ---------------------------
    return res.status(200).json({
      success: true,
      message: "已成功寫入 Google Sheet"
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Server error", detail: error.message });
  }
}