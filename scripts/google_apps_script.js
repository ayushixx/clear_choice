/**
 * ====================================================================
 * CLEAR CHOICE - GOOGLE APPS SCRIPT WEB APP ENDPOINT
 * Production-Ready Apps Script for Google Sheets & Gmail Automation
 * 100% Free & Zero-Cost Solution
 * ====================================================================
 * 
 * SETUP INSTRUCTIONS FOR THE CLIENT:
 * 1. Open Google Sheets (create a new sheet titled "CLEAR CHOICE Leads").
 * 2. Create three tabs/sheets inside: "Contact Inquiries", "Callback Requests", and "Lead Inquiries".
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Replace all code in Code.gs with this file's code.
 * 5. Update CLIENT_EMAIL and API_SECRET_KEY constants below.
 * 6. Click Deploy > New Deployment > Select Type: Web App.
 * 7. Set:
 *    - Execute as: Me
 *    - Who has access: Anyone (or Anyone with Link)
 * 8. Copy the Web App URL (e.g., https://script.google.com/macros/s/AKfycb.../exec).
 * 9. Set VITE_GOOGLE_SCRIPT_URL and VITE_API_KEY in your website's .env file.
 * 
 * IMPORTANT: After updating this script, you must create a NEW deployment
 * version (Deploy > New Deployment) for changes to take effect.
 */

// CONFIGURATION (CLIENT EDITABLE)
var CLIENT_EMAIL = "client@clearchoice.org"; // Change to recipient email address
var API_SECRET_KEY = "YOUR_SECRET_API_KEY"; // Secret key matching VITE_API_KEY

/**
 * GET Handler — serves two purposes:
 *   1. Health check (default): returns service status
 *   2. Admin data fetch (action=fetch): returns all sheet data as JSON for the admin panel
 */
function doGet(e) {
  var action = (e && e.parameter) ? e.parameter.action : "";
  
  // ─── Admin Panel: Fetch all submissions ───
  if (action === "fetch") {
    // Validate API key
    var providedKey = (e && e.parameter) ? (e.parameter.apiKey || e.parameter.api_key || "") : "";
    if (API_SECRET_KEY !== "" && providedKey !== API_SECRET_KEY) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Unauthorized: Invalid API Key"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    var leads = sheetToArray(ss, "Lead Inquiries");
    var contacts = sheetToArray(ss, "Contact Inquiries");
    var callbacks = sheetToArray(ss, "Callback Requests");
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      leads: leads,
      contacts: contacts,
      callbacks: callbacks,
      fetchedAt: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // ─── Default: Health check ───
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "CLEAR CHOICE Google Sheets & Gmail Web App Endpoint",
    time: new Date().toISOString()
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
  
  // Map header names to camelCase keys for the frontend
  var keyMap = {
    "Timestamp": "timestamp",
    "Full Name": "fullName",
    "Name": "name",
    "Phone": "phone",
    "Email": "email",
    "Message": "message",
    "Status": "status",
    "Concern Type": "concernType",
    "Preferred Time": "callbackTime",
    "Substance / Concern": "substance"
  };
  
  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      var key = keyMap[headers[j]] || headers[j].toLowerCase().replace(/\s+/g, '_');
      var value = data[i][j];
      
      // Convert Date objects to ISO strings
      if (value instanceof Date) {
        value = value.toISOString();
      }
      row[key] = value;
    }
    results.push(row);
  }
  
  // Return newest first
  results.reverse();
  return results;
}

function doPost(e) {
  try {
    var contents = {};
    
    // Parse postBody if JSON string
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
    
    // 1. API Key Validation
    var providedKey = contents.apiKey || contents.api_key || (e && e.parameter ? e.parameter.apiKey : "");
    if (API_SECRET_KEY !== "" && providedKey !== API_SECRET_KEY) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Unauthorized: Invalid API Key (" + providedKey + ")"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var type = contents.type || (e && e.parameter ? e.parameter.type : "contact");
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = new Date();
    
    if (type === "contact") {
      // 2A. Process Contact Form Submission
      var sheet = ss.getSheetByName("Contact Inquiries") || ss.insertSheet("Contact Inquiries");
      
      // Ensure Headers
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Timestamp", "Full Name", "Phone", "Message", "Status"]);
        sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#2E031D").setFontColor("#FFFFFF");
      }
      
      var fullName = contents.fullName || contents.full_name || contents.name || "N/A";
      var phone = contents.phone || "N/A";
      var message = contents.message || "";
      
      sheet.appendRow([timestamp, fullName, phone, message, "New"]);
      
      // Send Instant Gmail Notification
      sendGmailNotification("Contact Form Inquiry", {
        "Full Name": fullName,
        "Phone": phone,
        "Message": message,
        "Submitted At": timestamp.toLocaleString()
      });
      
    } else if (type === "callback") {
      // 2B. Process Callback Request Submission
      var sheet = ss.getSheetByName("Callback Requests") || ss.insertSheet("Callback Requests");
      
      // Ensure Headers
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
      
      // Send Instant Gmail Notification
      sendGmailNotification("Callback Consultation Request", {
        "Name": name,
        "Phone": phone,
        "Concern Type": concernType,
        "Preferred Time": callbackTime,
        "Message": message,
        "Submitted At": timestamp.toLocaleString()
      });

    } else if (type === "lead") {
      // 2C. Process Lead Inquiry (Get to Know More) Submission
      var sheet = ss.getSheetByName("Lead Inquiries") || ss.insertSheet("Lead Inquiries");
      
      // Ensure Headers
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
      
      // Send Instant Gmail Notification
      sendGmailNotification("Lead Inquiry (Get to Know More)", {
        "Name": name,
        "Phone": phone,
        "Email": email || "Not provided",
        "Substance / Concern": substance,
        "Message": message || "No message",
        "Submitted At": timestamp.toLocaleString()
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Submission logged in Google Sheets and notification email dispatched."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sends formatted Gmail notification using Google Apps Script GmailApp
 */
function sendGmailNotification(subjectType, data) {
  var subject = "[CLEAR CHOICE ALERT] New " + subjectType + ": " + (data["Full Name"] || data["Name"]);
  
  var body = "NEW FORM SUBMISSION RECEIVED\n";
  body += "========================================\n\n";
  
  for (var key in data) {
    body += key + ": " + data[key] + "\n";
  }
  
  body += "\n========================================\n";
  body += "All entries are automatically recorded in your Google Sheet.";
  
  try {
    GmailApp.sendEmail(CLIENT_EMAIL, subject, body);
  } catch (err) {
    Logger.log("Failed to send Gmail: " + err.toString());
  }
}
