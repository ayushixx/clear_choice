/**
 * ====================================================================
 * CLEAR CHOICE - GOOGLE APPS SCRIPT WEB APP ENDPOINT (Code.gs)
 * Production-Ready Apps Script for Google Sheets & Email Automation
 * 100% Free & Zero-Cost Solution
 * ====================================================================
 * 
 * STEP-BY-STEP SETUP / RE-AUTHORIZATION FOR CLIENT ACCOUNT:
 * 1. Open Google Sheets (create or open your sheet titled "CLEAR CHOICE Leads").
 * 2. In the top menu, click Extensions > Apps Script.
 * 3. Replace all code in Code.gs with this exact file's code.
 * 4. Update CLIENT_EMAIL below to Mehul / Client's email address.
 * 5. Update API_SECRET_KEY below (must match VITE_API_KEY on the website).
 * 6. Click "Deploy" (blue button at top right) > "New Deployment".
 * 7. Click the gear icon next to "Select type" and choose "Web app".
 * 8. Set:
 *    - Description: CLEAR CHOICE Web App v2
 *    - Execute as: Me (your-account@gmail.com)
 *    - Who has access: Anyone (CRITICAL: Must be "Anyone" so website can submit)
 * 9. Click "Deploy" and click "Authorize access". Choose your Google Account.
 *    (If you see "Google hasn't verified this app", click "Advanced" > "Go to CLEAR CHOICE (unsafe)" > "Allow").
 * 10. Copy the generated Web App URL (ends with /exec).
 * 11. Put the URL in your website's .env file:
 *     VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 *     VITE_API_KEY=CC12_9x8fK2Lm7pQzR5vN4sA2026
 * 
 * NOTE: Whenever code in Code.gs is edited, you MUST create a NEW deployment
 * (Deploy > New Deployment) for changes to take effect on the live URL.
 */

// ─── CONFIGURATION (CLIENT EDITABLE) ──────────────────────────────────
// Leave SPREADSHEET_ID empty if this script was opened from Extensions > Apps Script inside your sheet.
var SPREADSHEET_ID = ""; // Optional: Fallback Google Sheet ID if running standalone
var CLIENT_EMAIL = "client@clearchoice.org"; // Notification recipient email (e.g., Mehul's email)
var API_SECRET_KEY = "CC12_9x8fK2Lm7pQzR5vN4sA2026"; // Secret key matching VITE_API_KEY

/**
 * Retrieves the Google Sheet instance.
 * Automatically detects the container-bound spreadsheet, or falls back to SPREADSHEET_ID.
 */
function getSpreadsheet() {
  // 1. Container-bound sheet (Recommended: script opened directly from Sheet)
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) {
      return active;
    }
  } catch (e) {
    Logger.log("[Warn] getActiveSpreadsheet failed: " + e.message);
  }
  
  // 2. Fallback to SPREADSHEET_ID if provided
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "" && !SPREADSHEET_ID.includes("YOUR_SHEET_ID")) {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    } catch (e) {
      Logger.log("[Error] openById failed: " + e.message);
      throw new Error("Could not open Google Sheet with ID: " + SPREADSHEET_ID + " (" + e.message + ")");
    }
  }
  
  throw new Error("No active Google Spreadsheet found. Please ensure this script is attached to your Google Sheet (Extensions > Apps Script) or specify SPREADSHEET_ID.");
}

/**
 * GET Handler — handles:
 *   1. Health check & diagnostic ping (default)
 *   2. Admin data fetch (action=fetch)
 *   3. Diagnostic test submission (action=test)
 */
function doGet(e) {
  var action = (e && e.parameter) ? e.parameter.action : "";
  
  // ─── Admin Panel: Fetch all submissions ───
  if (action === "fetch") {
    var providedKey = (e && e.parameter) ? (e.parameter.apiKey || e.parameter.api_key || "") : "";
    if (API_SECRET_KEY !== "" && providedKey !== API_SECRET_KEY) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Unauthorized: Invalid API Key"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    try {
      var ss = getSpreadsheet();
      var directoryInquiries = sheetToArray(ss, "Directory Inquiries");
      var leads = sheetToArray(ss, "Lead Inquiries");
      var contacts = sheetToArray(ss, "Contact Inquiries");
      var callbacks = sheetToArray(ss, "Callback Requests");
      
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        directoryInquiries: directoryInquiries || [],
        leads: leads || [],
        contacts: contacts || [],
        callbacks: callbacks || [],
        fetchedAt: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Failed to fetch spreadsheet data: " + err.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  // ─── Test submission endpoint ───
  if (action === "test") {
    return handleSubmission({
      type: "directory_inquiry",
      apiKey: API_SECRET_KEY,
      name: "Test Verification User",
      relation: "Self",
      location: "Mumbai, Maharashtra",
      budget: "Flexible / Need Advice",
      patientAge: "28",
      substance: "Alcohol",
      status: "New"
    });
  }

  // ─── Default: Diagnostic Health Check ───
  var sheetConnected = false;
  var sheetTitle = "Unknown";
  try {
    var ss = getSpreadsheet();
    sheetConnected = !!ss;
    sheetTitle = ss.getName();
  } catch (err) {
    sheetTitle = "Error: " + err.message;
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "CLEAR CHOICE Google Sheets & Email Automation Web App",
    sheetConnected: sheetConnected,
    sheetTitle: sheetTitle,
    emailConfigured: !!CLIENT_EMAIL,
    serverTime: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * POST Handler — processes all incoming form submissions from the website.
 */
function doPost(e) {
  try {
    var contents = {};
    
    // Parse POST body (supports JSON or URL-encoded form data)
    if (e && e.postData && e.postData.contents) {
      try {
        contents = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        contents = e.parameter || {};
      }
    } else if (e && e.parameter) {
      contents = e.parameter;
    }
    
    // Fallback merge with URL parameters
    if (e && e.parameter) {
      for (var key in e.parameter) {
        if (!contents[key]) {
          contents[key] = e.parameter[key];
        }
      }
    }

    return handleSubmission(contents);
  } catch (err) {
    Logger.log("[Critical POST Error] " + err.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Server exception: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles validation, writing to Google Sheets, and dispatching email notifications.
 */
function handleSubmission(contents) {
  Logger.log("[Submission Received] " + JSON.stringify(contents));
  
  // 1. API Key Validation
  var providedKey = contents.apiKey || contents.api_key || "";
  if (API_SECRET_KEY !== "" && providedKey !== API_SECRET_KEY) {
    Logger.log("[Auth Failed] Provided key: " + providedKey);
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unauthorized: Invalid API Key (" + providedKey + ")"
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  var type = contents.type || "contact";
  var ss = getSpreadsheet();
  var timestamp = new Date();
  var targetSheetName = "";
  var appendedRow = 0;
  var emailStatus = "pending";

  // ─── 2A. Recovery Directory Intake Form Submission ───
  if (type === "directory_inquiry" || type === "recovery_directory_inquiry") {
    targetSheetName = "Directory Inquiries";
    var sheet = ss.getSheetByName(targetSheetName);
    if (!sheet) {
      sheet = ss.insertSheet(targetSheetName);
    }
    
    // 8 Required Columns: Timestamp, Name, Relation With Patient, Location, Budget, Patient Age, Substance, Status
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Relation With Patient", "Location", "Budget", "Patient Age", "Substance", "Status"]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#781353").setFontColor("#FFFFFF");
    }
    
    var name = contents.name || contents.fullName || contents.full_name || "N/A";
    var relation = contents.relationWithPatient || contents.relation_with_patient || contents.relation || "Self";
    var location = contents.location || "Not specified";
    var budget = contents.budget || contents.budgetRange || contents.budget_range || "Flexible / Need Advice";
    var patientAge = contents.patientAge || contents.patient_age || contents.age || "Not specified";
    var substance = contents.substance || "Not specified";
    var status = "New";
    
    sheet.appendRow([timestamp, name, relation, location, budget, patientAge, substance, status]);
    appendedRow = sheet.getLastRow();
    
    // Send Instant Email Notification
    emailStatus = sendEmailNotification("Recovery Directory Inquiry", {
      "Name": name,
      "Relation With Patient": relation,
      "Location": location,
      "Budget": budget,
      "Patient Age": patientAge,
      "Substance": substance,
      "Status": status,
      "Submitted At": timestamp.toLocaleString()
    });

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      sheet: targetSheetName,
      row: appendedRow,
      emailStatus: emailStatus,
      message: "Thank you for reaching out. Mehul will contact you shortly to discuss suitable recovery and rehabilitation options."
    })).setMimeType(ContentService.MimeType.JSON);

  // ─── 2B. Contact Form Submission ───
  } else if (type === "contact") {
    targetSheetName = "Contact Inquiries";
    var sheet = ss.getSheetByName(targetSheetName);
    if (!sheet) {
      sheet = ss.insertSheet(targetSheetName);
    }
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Full Name", "Phone", "Message", "Status"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#2E031D").setFontColor("#FFFFFF");
    }
    
    var fullName = contents.fullName || contents.full_name || contents.name || "N/A";
    var phone = contents.phone || "N/A";
    var message = contents.message || "";
    
    sheet.appendRow([timestamp, fullName, phone, message, "New"]);
    appendedRow = sheet.getLastRow();
    
    emailStatus = sendEmailNotification("Contact Form Inquiry", {
      "Full Name": fullName,
      "Phone": phone,
      "Message": message,
      "Submitted At": timestamp.toLocaleString()
    });

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      sheet: targetSheetName,
      row: appendedRow,
      emailStatus: emailStatus,
      message: "Contact inquiry logged successfully in Google Sheets."
    })).setMimeType(ContentService.MimeType.JSON);

  // ─── 2C. Callback Request Submission ───
  } else if (type === "callback") {
    targetSheetName = "Callback Requests";
    var sheet = ss.getSheetByName(targetSheetName);
    if (!sheet) {
      sheet = ss.insertSheet(targetSheetName);
    }
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "Concern Type", "Preferred Time", "Message", "Status"]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#781353").setFontColor("#FFFFFF");
    }
    
    var name = contents.name || contents.fullName || "N/A";
    var phone = contents.phone || "N/A";
    var concernType = contents.concernType || contents.concern_type || "General Inquiry";
    var callbackTime = contents.callbackTime || contents.callback_time || "Morning (9 AM - 12 PM)";
    var message = contents.message || "";
    
    sheet.appendRow([timestamp, name, phone, concernType, callbackTime, message, "New"]);
    appendedRow = sheet.getLastRow();
    
    emailStatus = sendEmailNotification("Callback Consultation Request", {
      "Name": name,
      "Phone": phone,
      "Concern Type": concernType,
      "Preferred Time": callbackTime,
      "Message": message,
      "Submitted At": timestamp.toLocaleString()
    });

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      sheet: targetSheetName,
      row: appendedRow,
      emailStatus: emailStatus,
      message: "Callback request logged successfully in Google Sheets."
    })).setMimeType(ContentService.MimeType.JSON);

  // ─── 2D. Lead Inquiry (Get to Know More) Submission ───
  } else if (type === "lead") {
    targetSheetName = "Lead Inquiries";
    var sheet = ss.getSheetByName(targetSheetName);
    if (!sheet) {
      sheet = ss.insertSheet(targetSheetName);
    }
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "Email", "Substance / Concern", "Message", "Status"]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#B45309").setFontColor("#FFFFFF");
    }
    
    var name = contents.name || "N/A";
    var phone = contents.phone || "N/A";
    var email = contents.email || "";
    var substance = contents.substance || "Not specified";
    var message = contents.message || "";
    
    sheet.appendRow([timestamp, name, phone, email, substance, message, "New"]);
    appendedRow = sheet.getLastRow();
    
    emailStatus = sendEmailNotification("Lead Inquiry (Get to Know More)", {
      "Name": name,
      "Phone": phone,
      "Email": email || "Not provided",
      "Substance / Concern": substance,
      "Message": message || "No message",
      "Submitted At": timestamp.toLocaleString()
    });

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      sheet: targetSheetName,
      row: appendedRow,
      emailStatus: emailStatus,
      message: "Lead inquiry logged successfully in Google Sheets."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "error",
    message: "Unknown submission type: " + type
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Converts a sheet's rows into an array of objects using the header row as keys.
 * Returns an empty array if the sheet doesn't exist or is empty.
 */
function sheetToArray(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() <= 1) return [];
  
  var data = sheet.getDataRange().getValues();
  var headers = data[0]; // First row = headers
  var results = [];
  
  var keyMap = {
    "Timestamp": "timestamp",
    "Full Name": "fullName",
    "Name": "name",
    "Phone": "phone",
    "Email": "email",
    "Relation": "relation",
    "Relation With Patient": "relation",
    "Location": "location",
    "Budget": "budget",
    "Budget Range": "budgetRange",
    "Patient Age": "patientAge",
    "Age": "patientAge",
    "Substance": "substance",
    "Substance / Concern": "substance",
    "Message": "message",
    "Source": "source",
    "Status": "status",
    "Concern Type": "concernType",
    "Preferred Time": "callbackTime"
  };
  
  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      var key = keyMap[headers[j]] || headers[j].toLowerCase().replace(/\s+/g, '_');
      var value = data[i][j];
      
      if (value instanceof Date) {
        value = value.toISOString();
      }
      row[key] = value;
    }
    
    // Cross-populate aliases for frontend compatibility
    if (row.name && !row.fullName) row.fullName = row.name;
    if (row.fullName && !row.name) row.name = row.fullName;
    if (row.budget && !row.budgetRange) row.budgetRange = row.budget;
    if (row.budgetRange && !row.budget) row.budget = row.budgetRange;

    results.push(row);
  }
  
  results.reverse(); // Newest first
  return results;
}

/**
 * Sends formatted email notification using MailApp first (works on any Google account),
 * with fallback to GmailApp. Logs outcomes clearly.
 */
function sendEmailNotification(subjectType, data) {
  if (!CLIENT_EMAIL || CLIENT_EMAIL.includes("@client.com") || CLIENT_EMAIL.includes("your-email")) {
    Logger.log("[Email Skipped] CLIENT_EMAIL is using placeholder: " + CLIENT_EMAIL);
    return "skipped_unconfigured";
  }

  var subject = "[CLEAR CHOICE ALERT] New " + subjectType + ": " + (data["Name"] || data["Full Name"] || "Inquiry");
  
  var body = "NEW CLEAR CHOICE INQUIRY RECEIVED\n";
  body += "========================================\n\n";
  
  for (var key in data) {
    body += key + ": " + data[key] + "\n";
  }
  
  body += "\n========================================\n";
  body += "All entries are automatically recorded in your Google Sheet.\n";
  body += "Clear Choice Recovery Platform (https://clearchoice.org)";

  // 1. Try MailApp
  try {
    MailApp.sendEmail(CLIENT_EMAIL, subject, body);
    Logger.log("[Email Success] Sent via MailApp to: " + CLIENT_EMAIL);
    return "sent_via_mailapp";
  } catch (mailErr) {
    Logger.log("[Warn] MailApp failed (" + mailErr.toString() + "). Trying GmailApp...");
    
    // 2. Fallback to GmailApp
    try {
      GmailApp.sendEmail(CLIENT_EMAIL, subject, body);
      Logger.log("[Email Success] Sent via GmailApp to: " + CLIENT_EMAIL);
      return "sent_via_gmailapp";
    } catch (gmailErr) {
      Logger.log("[Error] Both MailApp and GmailApp failed: " + gmailErr.toString());
      return "failed: " + gmailErr.toString();
    }
  }
}
