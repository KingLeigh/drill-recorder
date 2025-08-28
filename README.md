# Drill Recorder - Google Sheets Integration

This project consists of a Google Apps Script and an HTML webpage that allows you to record drill results (SUCCESS/FAIL) and automatically save them to a Google Sheet.

## Files

- `google_apps_script.js` - The Google Apps Script code to deploy in your Google Sheet
- `index.html` - The webpage that collects user input and sends it to the sheet
- `README.md` - This setup guide

## Setup Instructions

### Step 1: Set up Google Apps Script

1. **Open Google Sheets** and create a new spreadsheet or use an existing one
2. **Go to Extensions > Apps Script** in the Google Sheets menu
3. **Replace the default code** with the contents of `google_apps_script.js`
4. **Save the project** with a name like "Drill Recorder"
5. **Run the `setupSheet` function once** to create the "Drill Results" sheet
6. **Run the `setupDrillsSheet` function once** to create the "Drills" sheet with default drill types
7. **Deploy as a web app** and copy the generated URL

### Step 2: Configure the Webpage

1. **Open `index.html`** in a text editor
2. **Replace the script URL** in the configuration section with your actual web app URL
3. **Save the file**

### Step 3: Test the System

1. **Open `index.html`** in a web browser
2. **Fill out the form** with test data
3. **Submit the form**
4. **Check your Google Sheet** to see if the data was recorded

## How It Works

The system allows users to select a drill from a dropdown list and then click either SUCCESS or FAIL to record the result. The data is sent to Google Apps Script via URL parameters and recorded to your active sheet with a timestamp.

## Data Structure

### Drill Results Sheet
Records: Timestamp, Drill Name, Success/Fail

### Drills Sheet
Contains the list of available drill types that can be selected from the dropdown.

## Customization

### Adding/Removing Drill Types
1. **Edit the Drills sheet** directly in Google Sheets
2. **Add new drill names** in column A (starting from row 2)
3. **Remove drill names** by deleting the corresponding rows
4. **Click the "Refresh Drill List" button** on the webpage to reload the list

### Modifying Data Fields
- Modify the `rowData` array in Apps Script to add/remove fields
- Update the HTML form to match your data structure
- Run `setupSheet` again after making changes

### Customizing Default Drills
- Edit the `setupDrillsSheet` function in the Apps Script to change the default drill list
- Run `setupDrillsSheet` again to apply changes

## Troubleshooting

- Check Apps Script execution logs
- Verify the web app URL is correct
- Ensure `setupSheet` function was run
- Check browser console for errors
