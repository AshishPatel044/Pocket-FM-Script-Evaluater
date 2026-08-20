# PocketFM Script Evaluator

AI-powered promo script evaluation tool for PocketFM's content team.

## Features
- OTP login restricted to @pocketfm.com emails
- AI evaluation against P0 benchmark scripts (Fantasy, Drama, Horror)
- 7-parameter scoring with detailed feedback
- Rewrite suggestions with original vs improved comparisons
- P0 benchmark comparison

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Fill in your API keys
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Environment Variables (backend/.env)
```
ANTHROPIC_API_KEY=your_key
EMAIL_USER=your@pocketfm.com
EMAIL_PASS=your_app_password
JWT_SECRET=random_long_string
PORT=3001
FRONTEND_URL=http://localhost:5173
```

> **Dev Mode:** If EMAIL_USER/EMAIL_PASS are not set, OTP is printed to the backend console.
