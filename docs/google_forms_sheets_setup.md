# Google Sheets & Google Apps Script Setup Guide

This guide explains how to set up the **100% Free Google Sheets & Gmail Integration** for CLEAR CHOICE.

---

## Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name the spreadsheet: `CLEAR CHOICE Leads`.
3. (Optional - Apps Script will auto-create them automatically if missing) Create the tabs:
   - `Directory Inquiries` (Columns: `Timestamp`, `Name`, `Relation With Patient`, `Location`, `Budget`, `Patient Age`, `Substance`, `Status`)
   - `Contact Inquiries` (Columns: `Timestamp`, `Full Name`, `Phone`, `Message`, `Status`)
   - `Callback Requests` (Columns: `Timestamp`, `Name`, `Phone`, `Concern Type`, `Preferred Time`, `Message`, `Status`)
   - `Lead Inquiries` (Columns: `Timestamp`, `Name`, `Phone`, `Email`, `Substance / Concern`, `Message`, `Status`)

---

## Step 2: Add the Google Apps Script
1. In the top menu of your Google Sheet, click **Extensions > Apps Script**.
2. Erase any code inside `Code.gs` and paste the contents of [`scripts/google_apps_script.js`](../scripts/google_apps_script.js).
3. Update the configuration variables at the top of the file:
   ```javascript
   var CLIENT_EMAIL = "your-email@client.com"; // Your notification recipient email (e.g., Mehul's email)
   var API_SECRET_KEY = "YOUR_SECRET_API_KEY"; // Secret key matching VITE_API_KEY
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

> **IMPORTANT**: Whenever you update `Code.gs`, you MUST create a new deployment (**Deploy > New Deployment**) or update the existing deployment to ensure the newest code is active.

---

## Step 4: Configure Website Environment Variables
Add the Web App URL and API Key to your website's `.env` file (or Vercel Environment Variables):

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_API_KEY=YOUR_SECRET_API_KEY
```

---

## How It Works
- **Directory Inquiries Form**: Submissions are automatically appended to the `Directory Inquiries` sheet with status `New`, and an instant email alert is dispatched to Mehul/team. If the sheet doesn't exist, Apps Script creates it automatically with formatted headers.
- **Contact Form**: Appends to `Contact Inquiries` sheet with instant Gmail notification.
- **Callback Request Form**: Appends to `Callback Requests` sheet with instant Gmail notification.
- **Admin Panel**: Fetches all inquiries in real-time using `?action=fetch` with API key validation.

---

## Transferring Ownership to a Client
To transfer complete ownership to a client:
1. Share the Google Sheet with the client's Google Account and set them as **Owner**.
2. The client will own all past and future form submission records with zero monthly software costs.
