# FindMind Setup Guide

This guide will help you get the FindMind therapist-matching platform up and running.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)
- An OpenAI API key

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

#### a. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to finish setting up

#### b. Enable pgvector Extension

1. In your Supabase dashboard, go to **Database** → **Extensions**
2. Search for `vector` and enable it

#### c. Run the Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Open the file `scripts/setup-database.sql` in this project
3. Copy all the SQL code
4. Paste it into the SQL Editor and click **Run**

This will create the `therapists` table with all necessary fields and indexes.

### 3. Configure Environment Variables

The project already has the Supabase credentials configured in `.env.local`. You need to add your OpenAI API key:

1. Open `.env.local` (or create it if it doesn't exist)
2. The Supabase credentials should already be there:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://lyqkaivqbdgkifclqthu.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   ```

### 4. Seed the Database

Run the seed script to populate your database with 20 sample therapist profiles:

```bash
npm run seed
```

This will:
- Generate 20 diverse therapist profiles
- Create embeddings for semantic search using OpenAI
- Store everything in your Supabase database

**Note**: This process takes 1-2 minutes because it generates embeddings for each therapist.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing the Application

### 1. AI Chat Interface (Homepage)

1. Go to [http://localhost:3000](http://localhost:3000)
2. Start a conversation with the AI
3. Tell it about what you're looking for in a therapist:
   - Issues you're facing (anxiety, depression, etc.)
   - Preferences (location, insurance, language, etc.)
   - Religious community if relevant (Chasidish, Yeshivish, Modern Orthodox)
4. After a few messages, click **"Find My Matches"**
5. View your personalized therapist matches with match scores

### 2. Explore Page

1. Go to [http://localhost:3000/explore](http://localhost:3000/explore)
2. Browse all therapists
3. Use filters to narrow down results:
   - Search by name or specialization
   - Filter by location, issues, therapy type
   - Filter by Jewish community
   - Toggle remote-only sessions
4. Click on any therapist card to view their full profile

### 3. Therapist Detail Page

- Click on any therapist from matches or explore page
- View complete profile including:
  - Bio and experience
  - Specializations and therapy approaches
  - Languages spoken
  - Insurance accepted
  - Contact information

## Troubleshooting

### Error: "Failed to fetch therapists"

- Check that your Supabase credentials are correct in `.env.local`
- Verify that the database schema was created successfully
- Check the browser console for specific error messages

### Error: "Failed to get response" (Chat)

- Verify your OpenAI API key is correct in `.env.local`
- Check that you have API credits remaining in your OpenAI account
- OpenAI API key should start with `sk-`

### No Matches Found

- Make sure you ran the seed script (`npm run seed`)
- Check Supabase dashboard → Table Editor → therapists to verify data exists
- Try having a longer conversation before clicking "Find Matches"

### Seeding Failed

- Verify your OpenAI API key is valid
- Check that the pgvector extension is enabled in Supabase
- Make sure you have enough OpenAI API credits

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── chat/         # AI conversation
│   │   ├── extract/      # Extract user preferences
│   │   ├── match/        # Match users with therapists
│   │   └── therapists/   # Get therapists with filters
│   ├── explore/          # Browse page
│   ├── therapist/[id]/   # Detail page
│   ├── layout.tsx        # Root layout with nav
│   ├── page.tsx          # Chat interface
│   └── globals.css       # Global styles
├── lib/
│   ├── supabase.ts       # Supabase client
│   └── openai.ts         # OpenAI config
├── types/
│   └── therapist.ts      # TypeScript types
├── scripts/
│   ├── setup-database.sql # Database schema
│   └── seed.ts           # Seed script
└── README.md             # Project overview
```

## Features

✅ AI-powered conversational matching
✅ Semantic search using vector embeddings
✅ Comprehensive filtering on explore page
✅ Jewish community matching (Chasidish, Yeshivish, Modern Orthodox)
✅ Remote/in-person session options
✅ Insurance filtering
✅ Language preferences
✅ Match scoring and ranking
✅ Beautiful, responsive UI
✅ Full therapist profiles

## Production Deployment

To deploy to production:

1. Push your code to GitHub
2. Connect to Vercel, Netlify, or your hosting platform
3. Add environment variables in the hosting dashboard
4. Deploy!

Make sure to:
- Use production-ready Supabase credentials
- Secure your API keys
- Set up proper error tracking
- Consider rate limiting for API routes

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the browser console for errors
3. Check the terminal for server-side errors
4. Verify all environment variables are set correctly

