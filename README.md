# FindMind - AI-Powered Therapist Matching Platform

A comprehensive therapist-matching platform with AI-powered conversational matching and browse/explore features.

## Features

- **AI Chat Interface**: Natural conversation to understand user needs and match with therapists
- **Explore Page**: Browse all therapists with comprehensive filtering
- **Semantic Matching**: Uses OpenAI embeddings for intelligent therapist matching
- **Detailed Profiles**: Complete therapist information including specializations, languages, insurance, and more

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + pgvector)
- OpenAI GPT-4

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `scripts/setup-database.sql`
4. Execute the SQL to create the tables and enable pgvector

### 4. Seed the Database

Run the seed script to populate sample therapist data:

```bash
npm run seed
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── chat/         # AI conversation endpoint
│   │   ├── extract/      # Data extraction endpoint
│   │   ├── match/        # Matching algorithm endpoint
│   │   └── therapists/   # Therapist listing endpoint
│   ├── explore/          # Browse therapists page
│   ├── therapist/[id]/   # Therapist detail page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page (AI chat)
├── lib/
│   ├── supabase.ts       # Supabase client
│   └── openai.ts         # OpenAI utilities
├── types/
│   └── therapist.ts      # TypeScript types
└── scripts/
    ├── setup-database.sql # Database schema
    └── seed.ts           # Data seeding script
```

## Matching Criteria

The platform matches users with therapists based on:

- **Issues/Concerns**: Mental health conditions and challenges
- **Therapy Types**: CBT, DBT, psychodynamic, EMDR, etc.
- **Location**: Geographic area or remote therapy preference
- **Languages**: Preferred communication language
- **Insurance**: Accepted insurance providers
- **Demographics**: Gender preference, cultural/religious background
- **Session Format**: Individual, couples, family, or group therapy
- **Jewish Community**: Chasidish, Yeshivish, Modern Orthodox, etc.

## License

MIT

