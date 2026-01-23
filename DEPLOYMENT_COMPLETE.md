# Complete ClickTale Deployment Guide - Vercel + Backend

## 🚀 Deployment Overview

Your ClickTale site will be deployed across:
- **Frontend + API**: Vercel (serverless functions for email)
- **Local Development**: Node.js server for development

---

## Step 1: Prepare for Deployment

### 1.1 Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
```

### 1.2 Ensure All Files Are Committed to GitHub
```bash
git add .
git commit -m "Add Vercel deployment config and API routes"
git push origin master
```

---

## Step 2: Deploy to Vercel

### Option A: Deploy from Vercel Dashboard (Easiest)

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign up/Login** with GitHub account
3. **Click "Add New"** → **"Project"**
4. **Select your repository**: `clicktale---professional-photography`
5. **Framework Preset**: Select **"Vite"**
6. **Build Command**: Should auto-fill as `npm run build`
7. **Click "Deploy"**

### Option B: Deploy from CLI

```bash
cd c:\Users\v.Janikashvili\Desktop\clicktale---professional-photography
vercel --prod
```

---

## Step 3: Add Environment Variables to Vercel

After deployment:

1. **Go to** Vercel Dashboard → Your Project
2. **Settings** → **Environment Variables**
3. **Add these variables**:

| Key | Value |
|-----|-------|
| `EMAIL_USER` | `vaktonik@gmail.com` |
| `EMAIL_PASSWORD` | `vppzsqpojpofvpru` |
| `GEMINI_API_KEY` | Your Gemini API key |

4. **Redeploy** after adding variables:
   ```bash
   vercel --prod
   ```

---

## Step 4: Verify Deployment

After deployment is complete:

### Test Your Site
- **Frontend**: `https://your-project-name.vercel.app`
- **API Health Check**: `https://your-project-name.vercel.app/api/health`
- **Contact Form**: `https://your-project-name.vercel.app/#/contact`

### Test Email Functionality
1. Go to contact page
2. Fill form and submit
3. Check email at `vaktonik@gmail.com`

---

## Development Workflow (Local Testing)

### Running Locally Before Deployment

**Terminal 1 - Backend Server**:
```bash
npm run server
```
Output: `Server running on port 5000`

**Terminal 2 - Frontend Dev Server**:
```bash
npm run dev
```
Output: `http://localhost:3000/`

Both should work at `http://localhost:3000/#/contact`

---

## File Structure for Deployment

```
clicktale---professional-photography/
├── api/
│   └── send-booking.js          # Vercel serverless function
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
├── server.js                     # Development backend (local only)
├── vercel.json                   # Vercel configuration
├── vite.config.ts               # Vite build config
├── package.json
└── .env.local                    # Local development only (NOT deployed)
```

---

## Important Notes

### 1. Environment Variables
- `.env.local` is **NOT** deployed to Vercel (it's in `.gitignore`)
- Add variables through Vercel Dashboard instead
- Never commit `.env.local` to GitHub

### 2. API Endpoint
The Contact form automatically detects:
- **Local development** (localhost): Uses `http://localhost:5000/api/send-booking`
- **Production** (Vercel): Uses `/api/send-booking` (serverless function)

### 3. Vercel Limits
- **Serverless functions**: 30-second timeout (sufficient for email)
- **Memory**: 1024 MB per function
- **Free tier**: 100 GB bandwidth/month

---

## Troubleshooting

### "Email not sending on Vercel"
1. Verify environment variables are set in Vercel Dashboard
2. Check Gmail 2-step verification is enabled
3. Check app password is correct (no spaces)
4. Check Vercel Function logs: Settings → Functions

### "API returns 404"
1. Check `vercel.json` exists in root
2. Verify `api/send-booking.js` exists
3. Redeploy: `vercel --prod`

### "CORS errors"
Vercel automatically handles CORS for same-origin requests. If issues persist:
```javascript
// Add to api/send-booking.js
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
```

---

## Custom Domain (Optional)

Once deployed on Vercel:

1. **Go to** Project Settings → **Domains**
2. **Add** your domain (e.g., `clicktale.com`)
3. **Follow DNS instructions** provided by Vercel
4. **Wait** for DNS propagation (usually 24-48 hours)

---

## Update Deployment Workflow

After making changes locally:

```bash
# Test locally
npm run dev
npm run server

# Push to GitHub
git add .
git commit -m "Your message"
git push origin master

# Vercel auto-deploys on push!
# Or manually redeploy:
vercel --prod
```

---

## Next Steps

1. **Test locally** - make sure everything works
2. **Push to GitHub** - commit all changes
3. **Deploy to Vercel** - connect your GitHub repo
4. **Set environment variables** - in Vercel Dashboard
5. **Test on production** - visit your Vercel URL
6. **Add custom domain** (optional)

---

## Support

For Vercel issues: [vercel.com/docs](https://vercel.com/docs)
For email/nodemailer issues: Check Vercel Function logs
