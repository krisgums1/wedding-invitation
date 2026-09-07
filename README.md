# Wedding Invitation Website

A beautiful, responsive wedding invitation website with animated envelope, RSVP form, and data management.

## Features

✨ **Interactive Envelope Animation**
- Click the stamp to open the envelope and reveal the invitation
- Smooth 3D animations and floating effects

👰 **Beautiful Invitation Design**
- Elegant layout with customizable wedding details
- Color theme: Light Pink, Light Yellow Green, Olive Green, and Beige
- Fully responsive design for all devices

📝 **RSVP Form**
- Guest information collection (name, email, phone)
- Number of guests selection
- Attendance confirmation (Yes/No)
- Dietary restrictions and special messages
- Form validation

📊 **Data Management**
- RSVPs stored in browser's localStorage
- Automatic deadline enforcement
- Export to CSV file for easy management
- Admin function to download all RSVPs after deadline

⏰ **RSVP Deadline**
- Set your custom deadline date
- Displays days remaining to guests
- Automatic deadline enforcement
- Export functionality triggered after deadline

## Setup Instructions

### 1. Customize Your Wedding Details

Edit `script.js` and update:

```javascript
// Update the RSVP deadline
const CONFIG = {
    rsvpDeadline: new Date('2024-12-31T23:59:59'), // Your deadline here
    storageKey: 'weddingRSVPs'
};
```

### 2. Add Wedding Event Details

Edit `script.js` and update the `showInvitationPage()` function:

```javascript
<p style="font-size: 20px; color: #808000; margin: 20px 0;"><strong>
    [Bride Name] & [Groom Name]  <!-- Change names here -->
</strong></p>

// Update these placeholders:
<p id="eventDate">[Wedding Date]</p>
<p id="eventTime">[Wedding Time]</p>
<p id="eventLocation">[Venue Name]</p>
<p id="eventAddress">[Full Address]</p>
```

### 3. Deploy to Netlify

#### Option A: Via Netlify UI
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository (`krisgums1/wedding-invitation`)
4. Deploy automatically

#### Option B: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

#### Option C: Drag & Drop
1. Go to [Netlify](https://netlify.com)
2. Drag and drop the project folder to deploy

### 4. Access Data After RSVP Deadline

#### View RSVPs in Browser Console:
```javascript
// Open browser console (F12 or Cmd+Option+I)
// Paste this command to see all RSVPs:
JSON.parse(localStorage.getItem('weddingRSVPs'))
```

#### Download RSVPs as CSV:
```javascript
// In browser console, run:
downloadRSVPsAfterDeadline()

// Or manually:
exportRSVPsToCSV()
```

This will download a CSV file with all RSVP responses that can be opened in Excel or Google Sheets.

## File Structure

```
wedding-invitation/
├── index.html       # Main landing page with envelope
├── styles.css       # Complete styling with color theme
├── script.js        # Interactive functionality and data management
├── netlify.toml     # Netlify configuration
├── package.json     # Project metadata
└── README.md        # This file
```

## Color Scheme

- **Light Pink**: #FFE4E1, #FFB6C1
- **Light Yellow Green**: #FFFACD, #F0E68C
- **Olive Green**: #9ACD32, #808000
- **Beige**: #FFE4B5, #D4A574, #F5DEB3

## Customization Options

### Change Deadline
Edit the `CONFIG` object in `script.js`:
```javascript
rsvpDeadline: new Date('2025-06-15T23:59:59')
```

### Modify Color Theme
Edit `styles.css` and replace the color values throughout.

### Add More Form Fields
Edit the RSVP form in the `showRSVPPage()` function in `script.js`.

## Data Export

All RSVPs are automatically saved to the browser's localStorage. After your RSVP deadline:

1. Open the website in a browser used to collect RSVPs
2. Open browser Developer Tools (F12)
3. Go to Console tab
4. Run: `downloadRSVPsAfterDeadline()`
5. A CSV file will download automatically

**Note**: If you used multiple devices or cleared cache, only RSVPs from that device's storage will be available.

## Security Note

This website uses browser localStorage for RSVP storage. For production use with sensitive data, consider:
- Adding a backend database (Firebase, MongoDB, etc.)
- Using environment variables for configuration
- Implementing user authentication if needed

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for personal use.

---

**Questions?** Check the code comments in `script.js` and `styles.css` for detailed explanations!
