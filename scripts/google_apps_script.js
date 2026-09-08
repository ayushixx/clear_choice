/**
 * ====================================================================
 * CLEAR CHOICE - GOOGLE APPS SCRIPT WEB APP ENDPOINT
 * Production-Ready Apps Script for Google Sheets & Gmail Automation
 * 100% Free & Zero-Cost Solution
 * ====================================================================
 * 
 * SETUP INSTRUCTIONS FOR THE CLIENT:
 * 1. Open Google Sheets (create a new sheet titled "CLEAR CHOICE Leads").
 * 2. Create two tabs/sheets inside: "Contact Inquiries" and "Callback Requests".
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Replace all code in Code.gs with this file's code.
 * 5. Update CLIENT_EMAIL and API_SECRET_KEY constants below.
 * 6. Click Deploy > New Deployment > Select Type: Web App.
 * 7. Set:
 *    - Execute as: Me
 *    - Who has access: Anyone (or Anyone with Link)
 * 8. Copy the Web App URL (e.g., https://script.google.com/macros/s/AKfycb.../exec).
 * 9. Set VITE_GOOGLE_SCRIPT_URL and VITE_API_KEY in your website's .env file.
 */

// CONFIGURATION (CLIENT EDITABLE)
var CLIENT_EMAIL = "client@clearchoice.org"; // Change to recipient email address
var API_SECRET_KEY = "clearchoice_secret_api_key_2026"; // Change to your secret API key

function doPost(e) {
  try {
    var contents = e.postData ? JSON.parse(e.postData.contents) : e.parameter;
    
    // 1. API Key Validation
    var providedKey = contents.apiKey || e.parameter.apiKey;
    if (providedKey !== API_SECRET_KEY) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Unauthorized: Invalid API Key"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var type = contents.type || "contact";
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
      
      var fullName = contents.fullName || "N/A";
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
      
      var name = contents.name || "N/A";
      var phone = contents.phone || "N/A";
      var concernType = contents.concernType || "General Inquiry";
      var callbackTime = contents.callbackTime || "Morning (9 AM - 12 PM)";
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
