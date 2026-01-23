#!/usr/bin/env node

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env.local') });

console.log('\n=== ClickTale Email Configuration Check ===\n');

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

console.log('✓ EMAIL_USER:', emailUser);
console.log('✓ EMAIL_PASSWORD:', emailPassword ? `${emailPassword.length} characters` : 'NOT SET');

if (!emailPassword) {
  console.log('\n❌ ERROR: EMAIL_PASSWORD is not set in .env.local');
  console.log('Solution: Add EMAIL_PASSWORD=your_16_char_app_password to .env.local\n');
  process.exit(1);
}

if (emailPassword.includes(' ')) {
  console.log('\n⚠️  WARNING: EMAIL_PASSWORD contains spaces!');
  console.log('Remove spaces from your app password.');
  console.log('Current password length (with spaces):', emailPassword.length);
  console.log('Password should be 16 characters without spaces.\n');
  process.exit(1);
}

if (emailPassword.length !== 16) {
  console.log('\n⚠️  WARNING: EMAIL_PASSWORD should be exactly 16 characters');
  console.log('Current length:', emailPassword.length);
  console.log('Check your Google App Password - it should look like: abcdefghijklmnop\n');
  process.exit(1);
}

console.log('\n✅ Email configuration looks valid!');
console.log('Password format: 16 characters, no spaces\n');
console.log('Next steps:');
console.log('1. Make sure 2-Step Verification is enabled on your Google account');
console.log('2. Verify the app password was generated from myaccount.google.com/apppasswords');
console.log('3. Run: npm run server\n');
