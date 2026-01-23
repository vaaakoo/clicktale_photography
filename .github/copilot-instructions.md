# ClickTale Professional Photography - Copilot Instructions

## Project Overview

**ClickTale** is a React + TypeScript portfolio site for Lina, a professional photographer in Santorini. The site features AI-powered itinerary planning via Google Gemini API, with a modern, dark-mode enabled UI built using Tailwind CSS and Vite.

- **Framework**: React 19 + React Router v7 (HashRouter)
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS with dark mode support
- **AI Integration**: Google Gemini 3 Flash Preview API
- **Dev Port**: 3000 (configured in vite.config.ts)

## Architecture & Data Flow

### Pages Structure (React Router)

- **`/`** → `Home.tsx` - Hero section, services grid, portfolio preview, FAQ
- **`/portfolio`** → `Portfolio.tsx` - Filterable gallery by SessionType (Couples, Family, Lifestyle, Restaurants)
- **`/about`** → `About.tsx` - Photographer bio
- **`/contact`** → `Contact.tsx` - Booking/contact form

All pages wrap in `Layout.tsx` which provides sticky header navigation and global `AIChatAssistant` floating chat.

### Data Model

**`types.ts`** defines:
- `SessionType` enum (COUPLES, FAMILY, LIFESTYLE, RESTAURANTS) - core categorization
- `PortfolioItem`, `ServiceItem`, `FAQItem` interfaces

**`constants.ts`** exports:
- `SERVICES[]` - 4 service offerings with descriptions and Google image URLs
- `PORTFOLIO[]` - ~30+ portfolio items with categories
- `FAQ[]` - FAQ content
- Image URLs like `HERO_BG`, `ALEX_PORTRAIT` for hero and about sections

### AI Integration Pattern

**`geminiService.ts`**:
- **Critical**: API key passed via `process.env.API_KEY` (set in `.env.local`, injected by Vite in `vite.config.ts`)
- **Function**: `generateItinerary(preferences: string)` → calls Gemini with photography expertise prompt
- **Model**: `gemini-3-flash-preview`
- **Error handling**: Returns fallback text on API failures (no throwing)
- **Usage**: Called from `AIChatAssistant.tsx` on user input

**Chat flow**: User types in floating chat → `handleSend()` → `generateItinerary(userMessage)` → response appended to message history

### Email & Booking System

**`server.js`** (Node.js backend):
- Express server running on port 5000
- Nodemailer integration with Gmail SMTP
- **POST `/api/send-booking`** endpoint receives booking data:
  - Sends confirmation email to customer
  - Sends notification to photographer (vjanikashvili@gmail.com)
- Uses Gmail App Passwords for secure authentication (not regular Gmail password)

**`Contact.tsx`** (Frontend):
- Form state management (name, email, date, message)
- Submits to `http://localhost:5000/api/send-booking`
- Shows success/error feedback to user
- Clears form on successful submission

## Key Conventions & Patterns

### Component Style
- Functional components with hooks (useState, useRef, useEffect)
- Inline className Tailwind styling (no CSS modules)
- Dark mode support via `dark:` prefix in tailwind classes
- Material Symbols for icons: `<span className="material-symbols-outlined">`

### UI Patterns
- **Header**: Sticky, blur/border on scroll, responsive mobile menu, navigation links auto-highlight via `useLocation()`
- **Buttons**: Rounded pills with conditional primary/secondary styling
- **Sections**: Max-width constraint `max-w-[1400px]` or `max-w-[1200px]` centered with mx-auto
- **Animations**: `animate-fadeInUp`, `scale-100`, `transition-all` for smooth effects

### Portfolio Filtering
- **`Portfolio.tsx`**: Multi-select filter using SessionType enum
- **Pattern**: `filter === 'All' ? PORTFOLIO : PORTFOLIO.filter(item => item.category === filter)`
- Pagination via `visibleCount` state with "Load More" button

## Development Workflow

```bash
npm install              # Install dependencies
npm run server          # Start Node.js email server (port 5000)
npm run dev             # Start Vite dev server (port 3000, in separate terminal)
npm run dev-full        # Start both server and Vite (requires concurrently)
npm run build           # Build for production
npm run preview         # Preview production build locally
```

**Environment Setup**: 
1. Create/update `.env.local` with:
   - `GEMINI_API_KEY=your_gemini_key`
   - `EMAIL_USER=vjanikashvili@gmail.com`
   - `EMAIL_PASSWORD=your_gmail_app_password` (NOT regular password - use [Google App Password](https://myaccount.google.com/apppasswords))
   - `PORT=5000`

2. To enable Gmail sending:
   - Enable 2-step verification on your Google account
   - Generate an [App Password](https://myaccount.google.com/apppasswords)
   - Use the 16-character password in `EMAIL_PASSWORD`

## Testing & Debugging Tips

- **No test framework configured** - manual testing only (consider adding Vitest)
- **Console errors**: Check browser DevTools for Gemini API connection issues
- **API Key validation**: Test in `geminiService.ts` first; if response is undefined, check `.env.local`
- **Routing**: Uses `HashRouter` (URLs have `#/path` format) not `BrowserRouter`
- **Dark mode**: Toggle with system preference or manually add `dark` class to `<html>` for testing

## File Structure Notes

```
├── components/
│   ├── Layout.tsx          # Header + responsive nav + global chat
│   ├── AIChatAssistant.tsx # Floating chat widget (always visible)
│   └── FAQSection.tsx      # Reusable FAQ accordion
├── pages/
│   ├── Home.tsx            # Services, portfolio preview, FAQ
│   ├── Portfolio.tsx       # Full gallery with category filter
│   ├── About.tsx           # Bio section
│   └── Contact.tsx         # Contact form
├── services/
│   └── geminiService.ts    # Gemini API client
├── constants.ts            # Static data (SERVICES, PORTFOLIO, FAQ)
├── types.ts                # TypeScript interfaces & enums
└── App.tsx                 # Router setup (HashRouter, not Browser)
```

## Common Tasks

**Adding a new portfolio item**:
1. Add object to `PORTFOLIO[]` in `constants.ts` with `id`, `title`, `category` (SessionType), `imageUrl`, `description`
2. No component changes needed - `Portfolio.tsx` renders dynamically

**Modifying AI behavior**:
1. Edit the system prompt string in `generateItinerary()` in `geminiService.ts`
2. Keep format instruction (Markdown headers, concise) for consistent output

**Styling changes**:
1. Update tailwind classes inline in component classNames
2. Check `dark:` variant coverage for dark mode consistency
3. Use `primary` color variable from Tailwind config (blue accent)

## Known Limitations & Gaps

- Chat history not persisted (resets on refresh)
- No analytics or SEO optimization
- API errors shown as generic fallback text (no retry mechanism)
- Email server must be running separately on port 5000 for bookings to work
- Production deployment requires environment variables for email credentials
