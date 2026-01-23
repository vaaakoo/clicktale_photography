import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env.local') });

const app = express();
app.use(cors());
app.use(express.json());

// Verify environment variables are loaded
console.log('EMAIL_USER loaded:', process.env.EMAIL_USER ? '✓' : '✗');
console.log('EMAIL_PASSWORD loaded:', process.env.EMAIL_PASSWORD ? '✓' : '✗');

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'ClickTale Backend Server is running ✓', port: process.env.PORT || 5000 });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'running', timestamp: new Date().toISOString() });
});

// Email transporter configuration
// Using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Gmail connection failed:', error.message);
  } else {
    console.log('✅ Gmail connection successful - ready to send emails');
  }
});

// Test booking endpoint (without sending email)
app.post('/api/test-booking', async (req, res) => {
  const { name, email, date, message } = req.body;

  if (!name || !email || !date || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('\n=== TEST BOOKING REQUEST ===');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Date:', date);
  console.log('Message:', message);
  console.log('===========================\n');

  res.json({ 
    success: true, 
    message: 'TEST: Booking data received (email not sent)',
    data: { name, email, date, message }
  });
});

// Booking endpoint
app.post('/api/send-booking', async (req, res) => {
  const { name, email, date, message } = req.body;

  if (!name || !email || !date || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Email to admin (photographer)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `✨ New Booking Request from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 40px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .header p { margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; }
            .content { padding: 40px; }
            .booking-info { background-color: #f0f4ff; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 4px; }
            .info-row { display: flex; margin: 15px 0; }
            .info-label { font-weight: 600; color: #1e40af; min-width: 120px; }
            .info-value { color: #333; flex: 1; }
            .message-box { background-color: #fafafa; border: 1px solid #e0e0e0; padding: 20px; margin: 20px 0; border-radius: 6px; }
            .message-box h3 { margin-top: 0; color: #2563eb; }
            .footer { background-color: #f9fafb; border-top: 1px solid #e0e0e0; padding: 20px; text-align: center; color: #666; font-size: 12px; }
            .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📸 New Booking Request</h1>
              <p>ClickTale Professional Photography</p>
            </div>
            
            <div class="content">
              <p style="color: #333; font-size: 16px;">Hello Lina,</p>
              <p style="color: #666;">You have received a new booking request! Here are the details:</p>
              
              <div class="booking-info">
                <div class="info-row">
                  <div class="info-label">Client Name:</div>
                  <div class="info-value">${name}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Email:</div>
                  <div class="info-value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
                </div>
                <div class="info-row">
                  <div class="info-label">Preferred Date:</div>
                  <div class="info-value"><strong>${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></div>
                </div>
              </div>
              
              <div class="message-box">
                <h3>Client's Vision:</h3>
                <p style="color: #333; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p style="color: #666; font-size: 14px;">
                <a href="mailto:${email}" class="button">Reply to Client</a>
              </p>
              
              <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
                This is an automated message from ClickTale Booking System. Reply directly to the client's email to respond to their request.
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">ClickTale Professional Photography | Santorini, Greece</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Confirmation email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✨ Your Booking Request Received - ClickTale Photography',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 40px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .header p { margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; }
            .content { padding: 40px; }
            .success-badge { background-color: #dbeafe; border-left: 4px solid #0284c7; padding: 15px 20px; margin: 20px 0; border-radius: 4px; color: #0c4a6e; }
            .details-box { background-color: #f0f4ff; border: 1px solid #bfdbfe; padding: 20px; margin: 20px 0; border-radius: 6px; }
            .detail-item { margin: 12px 0; }
            .detail-label { font-weight: 600; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .detail-value { color: #333; font-size: 16px; margin-top: 4px; }
            .message-section { background-color: #fafafa; border: 1px solid #e0e0e0; padding: 20px; margin: 20px 0; border-radius: 6px; }
            .message-section h3 { margin-top: 0; color: #2563eb; }
            .timeline { margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 6px; }
            .timeline-item { display: flex; margin: 15px 0; }
            .timeline-icon { font-size: 20px; margin-right: 15px; }
            .timeline-text { flex: 1; }
            .timeline-text p { margin: 0; color: #666; font-size: 14px; }
            .footer { background-color: #f9fafb; border-top: 1px solid #e0e0e0; padding: 30px 20px; text-align: center; }
            .footer-text { color: #666; font-size: 12px; margin: 5px 0; }
            .social { margin: 15px 0; }
            .social a { display: inline-block; width: 35px; height: 35px; background-color: #e5e7eb; color: #2563eb; text-decoration: none; border-radius: 50%; line-height: 35px; text-align: center; margin: 0 5px; font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Thank You, ${name.split(' ')[0]}!</h1>
              <p>Your booking request has been received</p>
            </div>
            
            <div class="content">
              <div class="success-badge">
                ✓ Your booking request was successfully submitted!
              </div>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Thank you for choosing ClickTale Professional Photography. I'm excited to hear about your vision for your session. I'll review your request carefully and get back to you soon with available dates and pricing options.
              </p>
              
              <div class="details-box">
                <div class="detail-item">
                  <div class="detail-label">📅 Your Preferred Date</div>
                  <div class="detail-value">${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">📧 Contact Email</div>
                  <div class="detail-value">${email}</div>
                </div>
              </div>
              
              <div class="message-section">
                <h3>Your Session Vision:</h3>
                <p style="color: #333; line-height: 1.8; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <div class="timeline">
                <h3 style="margin-top: 0; color: #2563eb;">What Happens Next:</h3>
                <div class="timeline-item">
                  <div class="timeline-icon">1️⃣</div>
                  <div class="timeline-text">
                    <p><strong>Review Your Request (24 hours)</strong><br>I'll carefully review your preferences and session details.</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">2️⃣</div>
                  <div class="timeline-text">
                    <p><strong>Send Availability</strong><br>I'll reply with available dates and pricing options tailored to your needs.</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">3️⃣</div>
                  <div class="timeline-text">
                    <p><strong>Confirm & Prepare</strong><br>Once confirmed, we'll coordinate the final details for your perfect shoot.</p>
                  </div>
                </div>
              </div>
              
              <p style="color: #666; font-size: 14px; margin: 20px 0;">
                If you have any questions in the meantime, feel free to reply to this email or visit our website at clicktale.com
              </p>
            </div>
            
            <div class="footer">
              <p class="footer-text"><strong>ClickTale Professional Photography</strong></p>
              <p class="footer-text">Oia, Santorini, Greece 🌅</p>
              <p class="footer-text">📸 Capturing your unforgettable moments</p>
              <div class="social">
                <a href="#">📷</a>
                <a href="#">🎬</a>
                <a href="#">📧</a>
              </div>
              <p class="footer-text" style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 15px;">
                © 2026 ClickTale. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    console.log('Sending admin email to:', adminMailOptions.to);
    // Send both emails
    await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent successfully');
    
    await transporter.sendMail(clientMailOptions);
    console.log('Client email sent successfully');

    res.json({ success: true, message: 'Booking request sent successfully!' });
  } catch (error) {
    console.error('Email error code:', error.code);
    console.error('Email error message:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ error: `Failed to send email: ${error.message}` });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
