// Google Apps Script to handle data from webpage and record to Google Sheet
// Deploy this as a web app in your Google Sheet

function doGet(e) {
  try {
    // Get parameters from the URL
    const params = e.parameter;
    
    // Check if this is a request for drills list
    if (params.action === 'getDrills') {
      return getDrills();
    }
    
    // Check if we have the required data for recording
    if (!params.data) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "No data provided"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the data (assuming it's JSON)
    let data;
    try {
      data = JSON.parse(params.data);
    } catch (parseError) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Invalid data format"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active spreadsheet and main sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('Drill Results') || spreadsheet.getActiveSheet();
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Prepare row data for drill recording
    const rowData = [
      timestamp,                    // Column A: Timestamp
      data.drill_name || '',       // Column B: Drill Name
      data.success || ''           // Column C: Success/Fail
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Data recorded successfully",
      timestamp: timestamp.toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to set up the main sheet headers (run this once manually)
function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('Drill Results');
  
  // Create Drill Results sheet if it doesn't exist
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Drill Results');
  }
  
  // Set headers for drill recording
  const headers = [
    'Timestamp',
    'Drill Name',
    'Success/Fail'
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('white');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log('Drill Results sheet setup complete!');
}

// Function to set up the Drills sheet with default drill types
function setupDrillsSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let drillsSheet = spreadsheet.getSheetByName('Drills');
  
  // Create Drills sheet if it doesn't exist
  if (!drillsSheet) {
    drillsSheet = spreadsheet.insertSheet('Drills');
  }
  
  // Clear existing content
  drillsSheet.clear();
  
  // Set header
  drillsSheet.getRange(1, 1).setValue('Drill Name');
  
  // Set default drill types
  const defaultDrills = [
    'Fire Drill',
    'Earthquake Drill',
    'Tornado Drill',
    'Lockdown Drill',
    'Evacuation Drill',
    'Medical Emergency Drill',
    'Active Shooter Drill',
    'Bomb Threat Drill',
    'Chemical Spill Drill',
    'Power Outage Drill'
  ];
  
  // Add drills to the sheet
  drillsSheet.getRange(2, 1, defaultDrills.length, 1).setValues(
    defaultDrills.map(drill => [drill])
  );
  
  // Format header
  drillsSheet.getRange(1, 1)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('white');
  
  // Auto-resize column
  drillsSheet.autoResizeColumn(1);
  
  Logger.log('Drills sheet setup complete!');
}

// Function to get the list of drills from the Drills sheet
function getDrills() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const drillsSheet = spreadsheet.getSheetByName('Drills');
    
    if (!drillsSheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Drills sheet not found"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get all drill names from column A (starting from row 2 to skip header)
    const drillsRange = drillsSheet.getRange(2, 1, drillsSheet.getLastRow() - 1, 1);
    const drills = drillsRange.getValues().flat().filter(drill => drill !== '');
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      drills: drills
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to test the web app locally
function testWebApp() {
  const testData = {
    drill_name: "Test Drill",
    success: "SUCCESS"
  };
  
  const encodedData = encodeURIComponent(JSON.stringify(testData));
  const url = `https://script.google.com/macros/s/AKfycbxldudJV-WBPaoffgRs_bKa1-oyEJY-MugQM_am3ElpHdsZ27VePAvUSJwDUEe30K8D/exec?data=${encodedData}`;
  
  Logger.log('Test URL: ' + url);
  Logger.log('Test data: ' + JSON.stringify(testData));
}
