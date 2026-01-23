# ClickTale Booking System - Setup Guide

## Quick Start

To set up real email notifications for bookings, follow these steps:

### Step 1: Enable Gmail App Passwords

1. Go to [Google Account Settings](https://myaccount.google.com)
2. Click **Security** in the left menu
3. Enable **2-Step Verification** (if not already enabled)
4. Go back to Security and select **App passwords**
5. Choose **Mail** and **Windows Computer**
6. Google will generate a 16-character password (e.g., `abcd efgh ijkl mnop`)
7. Copy this password

### Step 2: Configure Environment Variables

Edit `.env.local` in your project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration
EMAIL_USER=vjanikashvili@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop  # Your 16-char Google App Password (no spaces)
PORT=5000
```

**Important**: 
- Do NOT use your regular Gmail password
- Use the 16-character App Password from Google
- Remove spaces from the App Password

### Step 3: Start the Backend Server

In a terminal, run:

```bash
npm run server
```

You should see:
```
Server running on port 5000
```

### Step 4: Start the Frontend (in another terminal)

```bash
npm run dev
```

Or run both simultaneously:

```bash
npm run dev-full
```

### Step 5: Test the Booking Form

1. Go to http://localhost:3000/#/contact
2. Fill in the form:
   - Name
   - Email
   - Preferred Date
   - Your message
3. Click "Send Message"
4. You should see a success message
5. Check your email (vjanikashvili@gmail.com) for the booking notification

## How It Works

### Frontend Flow
1. User fills the contact form on `/contact`
2. Clicks "Send Message"
3. Form data is sent to `http://localhost:5000/api/send-booking`
4. User sees success/error feedback

### Backend Flow
1. **`server.js`** runs an Express server on port 5000
2. Receives booking POST request
3. Sends two emails via Gmail SMTP:
   - **Admin email**: To vjanikashvili@gmail.com with booking details
   - **Confirmation email**: To the customer with their submitted information
4. Returns success/error response to frontend

## Troubleshooting

### "Network error. Please check if the server is running."
- Make sure `npm run server` is running in a terminal
- Verify the backend is on port 5000
- Check browser console for CORS errors

### Email not received
- Verify EMAIL_PASSWORD is the 16-char App Password (no spaces)
- Check spam folder
- Ensure EMAIL_USER is correct in `.env.local`
- Check terminal output for error messages

### "Failed to send email"
- Check that 2-Step Verification is enabled on the Google account
- Verify App Password hasn't expired (regenerate if needed)
- Ensure `.env.local` has correct EMAIL_PASSWORD

### Server won't start
- Make sure port 5000 is not in use
- Try: `npm run server` (or specify a different PORT in `.env.local`)

## Email Templates

### Admin Notification
The photographer receives a professional email with:
- Customer name
- Customer email
- Preferred session date
- Full message/vision details
- Reply-to link

### Customer Confirmation
The customer receives a confirmation email with:
- Acknowledgment of their booking
- Echo of their submitted details
- Expected response time (24 hours)
- Photographer's name and studio info

## Production Deployment

For production (e.g., Vercel, Heroku):

1. Add environment variables to your hosting platform:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `GEMINI_API_KEY`

2. Backend hosting options:
   - **Option A**: Use a serverless function (AWS Lambda, Vercel Functions)
   - **Option B**: Use a separate backend service (Heroku, Railway, Render)
   - **Option C**: Deploy frontend only, use Formspree/EmailJS as alternative

3. Update frontend API URL from `http://localhost:5000/api/send-booking` to your production URL

## Security Notes

- Never commit `.env.local` to Git (already in `.gitignore`)
- Use App Passwords, not regular Gmail passwords
- Consider rate-limiting bookings in production
- Add CAPTCHA for production to prevent spam
