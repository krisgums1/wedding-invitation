// Configuration
const CONFIG = {
    rsvpDeadline: new Date('2024-12-31T23:59:59'), // Change this to your actual RSVP deadline
    storageKey: 'weddingRSVPs'
};

// DOM Elements
const envelope = document.getElementById('envelope');
const stamp = document.querySelector('.stamp');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set RSVP deadline display
    updateDeadlineDisplay();
    
    // Load existing RSVPs
    loadRSVPs();
});

// Envelope animation
stamp.addEventListener('click', () => {
    envelope.classList.toggle('open');
    if (envelope.classList.contains('open')) {
        setTimeout(() => {
            showInvitationPage();
        }, 600);
    }
});

// Show Invitation Page
function showInvitationPage() {
    const container = document.body;
    container.innerHTML = `
        <div class="invitation-page show">
            <div class="invitation-container">
                <div class="invitation-header">
                    <h1>You're Invited!</h1>
                    <p>✦ TO OUR WEDDING ✦</p>
                </div>

                <div class="invitation-content">
                    <p>Together with their families</p>
                    <p style="font-size: 20px; color: #808000; margin: 20px 0;"><strong>
                        [Bride Name] & [Groom Name]
                    </strong></p>
                    <p>request the honor of your presence<br>at the celebration of their marriage</p>
                </div>

                <div class="event-details">
                    <div class="detail-item">
                        <label>Date</label>
                        <p id="eventDate">[Wedding Date]</p>
                    </div>
                    <div class="detail-item">
                        <label>Time</label>
                        <p id="eventTime">[Wedding Time]</p>
                    </div>
                    <div class="detail-item">
                        <label>Location</label>
                        <p id="eventLocation">[Venue Name]</p>
                    </div>
                    <div class="detail-item">
                        <label>Address</label>
                        <p id="eventAddress">[Full Address]</p>
                    </div>
                </div>

                <div class="rsvp-section">
                    <p class="rsvp-deadline" id="deadlineInfo"></p>
                    <button class="rsvp-btn" onclick="showRSVPPage()">RSVP Now</button>
                </div>
            </div>
        </div>
    `;
    updateDeadlineDisplay();
}

// Show RSVP Form Page
function showRSVPPage() {
    const container = document.body;
    container.innerHTML = `
        <div class="rsvp-page show">
            <div class="rsvp-container">
                <h2>RSVP</h2>
                <div class="deadline-info" id="formDeadlineInfo"></div>

                <form id="rsvpForm">
                    <div class="form-group">
                        <label for="fullName">Full Name *</label>
                        <input type="text" id="fullName" name="fullName" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone">
                    </div>

                    <div class="form-group">
                        <label for="guests">Number of Guests *</label>
                        <select id="guests" name="guests" required>
                            <option value="">Select...</option>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="5">5+ Guests</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Will you be attending? *</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="attendance" value="yes" required>
                                Yes
                            </label>
                            <label>
                                <input type="radio" name="attendance" value="no" required>
                                No
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="dietary">Dietary Restrictions</label>
                        <textarea id="dietary" name="dietary" placeholder="Please list any dietary restrictions..."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="message">Special Message for the Couple</label>
                        <textarea id="message" name="message" placeholder="Share your well wishes..."></textarea>
                    </div>

                    <button type="submit" class="submit-btn">Submit RSVP</button>
                </form>

                <div class="success-message" id="successMessage">
                    <h3>✓ Thank You!</h3>
                    <p>Your RSVP has been received. We look forward to celebrating with you!</p>
                </div>

                <button class="rsvp-btn" onclick="goBackToInvitation()" style="margin-top: 20px; background: #D4A574;">← Back</button>
            </div>
        </div>
    `;

    updateDeadlineDisplay();

    const form = document.getElementById('rsvpForm');
    form.addEventListener('submit', handleRSVPSubmit);
}

// Handle RSVP Form Submission
function handleRSVPSubmit(e) {
    e.preventDefault();

    // Check if deadline has passed
    if (new Date() > CONFIG.rsvpDeadline) {
        alert('Sorry, the RSVP deadline has passed. Thank you for your interest!');
        return;
    }

    // Collect form data
    const formData = {
        timestamp: new Date().toISOString(),
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        guests: document.getElementById('guests').value,
        attendance: document.querySelector('input[name="attendance"]:checked').value,
        dietary: document.getElementById('dietary').value,
        message: document.getElementById('message').value
    };

    // Save to localStorage
    saveRSVP(formData);

    // Show success message
    document.getElementById('rsvpForm').style.display = 'none';
    document.getElementById('successMessage').classList.add('show');

    // Reset form
    setTimeout(() => {
        document.getElementById('rsvpForm').reset();
    }, 2000);
}

// Save RSVP to localStorage
function saveRSVP(data) {
    let rsvps = JSON.parse(localStorage.getItem(CONFIG.storageKey)) || [];
    rsvps.push(data);
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(rsvps));
    console.log('RSVP saved:', data);
}

// Load RSVPs from localStorage
function loadRSVPs() {
    const rsvps = JSON.parse(localStorage.getItem(CONFIG.storageKey)) || [];
    console.log('Total RSVPs:', rsvps.length);
    return rsvps;
}

// Export RSVPs to Excel/CSV
function exportRSVPsToCSV() {
    const rsvps = loadRSVPs();
    
    if (rsvps.length === 0) {
        alert('No RSVPs to export yet.');
        return;
    }

    // Create CSV content
    let csv = 'Full Name,Email,Phone,Number of Guests,Attendance,Dietary Restrictions,Message,Timestamp\n';
    
    rsvps.forEach(rsvp => {
        const row = [
            rsvp.fullName,
            rsvp.email,
            rsvp.phone,
            rsvp.guests,
            rsvp.attendance,
            `"${rsvp.dietary.replace(/"/g, '""')}"`,
            `"${rsvp.message.replace(/"/g, '""')}"`,
            rsvp.timestamp
        ].join(',');
        csv += row + '\n';
    });

    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `wedding-rsvps-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Update deadline display
function updateDeadlineDisplay() {
    const now = new Date();
    const isDeadlinePassed = now > CONFIG.rsvpDeadline;
    const daysRemaining = Math.ceil((CONFIG.rsvpDeadline - now) / (1000 * 60 * 60 * 24));

    const deadlineText = `RSVP by ${CONFIG.rsvpDeadline.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })}`;

    const element = document.getElementById('deadlineInfo') || document.getElementById('formDeadlineInfo');
    if (element) {
        if (isDeadlinePassed) {
            element.innerHTML = '⏰ The RSVP deadline has passed';
            element.style.color = '#E74C3C';
        } else {
            element.innerHTML = `${deadlineText} (${daysRemaining} days remaining)`;
            element.style.color = '#E74C3C';
        }
    }
}

// Navigate back to invitation
function goBackToInvitation() {
    showInvitationPage();
}

// Admin function to trigger download after deadline (call this after deadline date)
function downloadRSVPsAfterDeadline() {
    if (new Date() > CONFIG.rsvpDeadline) {
        exportRSVPsToCSV();
    } else {
        alert('RSVP deadline has not passed yet.');
    }
}
