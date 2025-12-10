# Quick Start Guide

Get FindMind running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Supabase account (free)
- OpenAI API key

## Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Database** → **Extensions** → Enable **vector**
3. Go to **SQL Editor** → Paste contents of `scripts/setup-database.sql` → Run

### 3. Add OpenAI API Key

Your Supabase credentials are already configured. Just add your OpenAI key to `.env.local`:

```
OPENAI_API_KEY=sk-your-api-key-here
```

### 4. Seed Database

```bash
npm run seed
```

Wait 1-2 minutes for it to complete.

### 5. Run the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## What You Can Do

### AI Chat (Homepage)
- Have a natural conversation about therapy needs
- AI extracts preferences automatically
- Get personalized therapist matches with scores

### Explore Page
- Browse all therapists
- Filter by:
  - Location
  - Issues (anxiety, depression, trauma, etc.)
  - Therapy type (CBT, EMDR, etc.)
  - Jewish community (Chasidish, Yeshivish, Modern Orthodox)
  - Session format (individual, couples, family)
  - Remote/in-person
  - Gender preference

### Therapist Profiles
- View complete information
- See specializations, insurance, languages
- Contact therapists directly

## Need Help?

See `SETUP.md` for detailed troubleshooting.

## Key Features

✨ **AI-Powered Matching** - GPT-4 conversation + semantic search
🎯 **Smart Filtering** - Comprehensive filter options
🕎 **Jewish Community Support** - Specialized matching for Orthodox communities
💻 **Remote Options** - Filter for online therapy
🌍 **Multi-language** - Support for Hebrew, Yiddish, Spanish, and more
📊 **Match Scoring** - See compatibility percentages
📱 **Mobile Friendly** - Responsive design for all devices

Enjoy using FindMind! 🧠

