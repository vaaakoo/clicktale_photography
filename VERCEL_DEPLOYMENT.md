# ClickTale - Vercel Deployment Guide

## Overview
Your ClickTale site has two parts:
1. **Frontend**: React + Vite (deployed to Vercel)
2. **Backend**: Node.js + Express (email server - needs separate deployment)

## Option 1: Deploy Everything to Vercel (Recommended)

### Step 1: Create Vercel API Routes for Email (Serverless Functions)

Create this file structure:
```
api/
├── send-booking.js
└── health.js
```

### Step 2: Update vercel.json Configuration

This tells Vercel how to handle your project.

### Step 3: Environment Variables in Vercel

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add:
- `EMAIL_USER` = vaktonik@gmail.com
- `EMAIL_PASSWORD` = vppzsqpojpofvpru
- `GEMINI_API_KEY` = your_gemini_key

### Step 4: Update Frontend to Use Production API

Change API calls from `http://localhost:5000` to your Vercel production URL.

---

## Option 2: Separate Backend Deployment (More Flexible)

Deploy backend separately to:
- **Render.com** (free tier available)
- **Railway.app** (free tier available)
- **Heroku** (paid)
- **Replit** (free)

Then update frontend to call that backend URL.

---

## Quick Start (Using Option 1 - Vercel Serverless)

I'll create the necessary files for you to deploy everything to Vercel.
