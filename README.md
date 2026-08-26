# PocketFM Script Evaluator

AI-powered promo script evaluation tool for PocketFM's content team.

## Features
- OTP login restricted to @pocketfm.com emails
- AI evaluation against show-specific benchmark promos and the first 20 episodes
- Nine-parameter scoring with source evidence, contradiction checks, fidelity, and exact five-option refresh suggestions for weak areas
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
OPENAI_API_KEY=your_new_server_side_key
OPENAI_MODEL=gpt-5
JWT_SECRET=random_long_string
PORT=3001
FRONTEND_URL=http://localhost:5173
```

> **Dev Mode:** If EMAIL_USER/EMAIL_PASS are not set, OTP is printed to the backend console.

Set `SHOW_CONTENT_ROOT` and `SHOW_PROMOS_ROOT` to the directories containing the supplied DOCX corpus. Never commit `.env` or API keys.
