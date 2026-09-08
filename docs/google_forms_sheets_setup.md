# Google Sheets & Google Apps Script Setup Guide

This guide explains how to set up the **100% Free Google Sheets & Gmail Integration** for CLEAR CHOICE.

---

## Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name the spreadsheet: `CLEAR CHOICE Leads`.
3. At the bottom of the spreadsheet, create two tabs:
   - `Contact Inquiries`
   - `Callback Requests`

---

## Step 2: Add the Google Apps Script
1. In the top menu of your Google Sheet, click **Extensions > Apps Script**.
2. Erase any code inside `Code.gs` and paste the contents of [`scripts/google_apps_script.js`](../scripts/google_apps_script.js).
3. Update the configuration variables at the top of the file:
   ```javascript
   var CLIENT_EMAIL = "your-email@client.com"; // Your notification recipient email
   var API_SECRET_KEY = "clearchoice_secret_api_key_2026"; // Secret key matching VITE_API_KEY
   ```
4. Click the **Save** icon (disk icon) or press `Ctrl + S` / `Cmd + S`.

---

## Step 3: Deploy as a Web App
1. In the upper-right corner of the Apps Script editor, click **Deploy > New Deployment**.
2. Click the gear icon next to "Select type" and select **Web app**.
3. Fill in the deployment details:
   - **Description**: `CLEAR CHOICE Form Web App`
   - **Execute as**: `Me (your-google-account@gmail.com)`
   - **Who has access**: `Anyone` (or `Anyone with link`)
4. Click **Deploy**.
5. Grant permissions if prompted by Google (click *Advanced* > *Go to CLEAR CHOICE Script (unsafe)* > *Allow*).
6. Copy the generated **Web App URL** (e.g. `https://script.google.com/macros/s/AKfycb.../exec`).

---

## Step 4: Configure Website Environment Variables
Add the Web App URL and API Key to your website's `.env` file (or Vercel Environment Variables):

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_API_KEY=clearchoice_secret_api_key_2026
```

---

## How It Works
- When a user submits the **Contact Form**, a new row is automatically added to the `Contact Inquiries` sheet and an instant email notification is sent via Gmail to `CLIENT_EMAIL`.
- When a user submits the **Callback Request Form**, a new row is automatically added to the `Callback Requests` sheet and an instant email notification is sent via Gmail.
- All leads remain private in Google Sheets and are accessible anytime.

---

## Transferring Ownership to a Client
To transfer complete ownership to a client:
1. Share the Google Sheet with the client's Google Account and set them as **Owner**.
2. The client will own all past and future form submission records with zero monthly software costs.
