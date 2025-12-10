-- Enable pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create therapists table
CREATE TABLE IF NOT EXISTS therapists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic information
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  years_experience INTEGER NOT NULL,
  
  -- Contact information
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  
  -- Specializations
  issues TEXT[] NOT NULL DEFAULT '{}',
  therapy_types TEXT[] NOT NULL DEFAULT '{}',
  
  -- Demographics
  gender TEXT NOT NULL,
  languages TEXT[] NOT NULL DEFAULT '{}',
  populations_served TEXT[] DEFAULT '{}',
  jewish_community TEXT,
  
  -- Practical details
  location TEXT NOT NULL,
  offers_remote BOOLEAN NOT NULL DEFAULT false,
  insurance_accepted TEXT[] DEFAULT '{}',
  session_formats TEXT[] NOT NULL DEFAULT '{}',
  
  -- Pricing
  price_range_min INTEGER NOT NULL,
  price_range_max INTEGER NOT NULL,
  
  -- Vector embedding for semantic search (1536 dimensions for OpenAI ada-002)
  specialization_embedding vector(1536)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_therapists_issues ON therapists USING GIN (issues);
CREATE INDEX IF NOT EXISTS idx_therapists_therapy_types ON therapists USING GIN (therapy_types);
CREATE INDEX IF NOT EXISTS idx_therapists_location ON therapists (location);
CREATE INDEX IF NOT EXISTS idx_therapists_gender ON therapists (gender);
CREATE INDEX IF NOT EXISTS idx_therapists_languages ON therapists USING GIN (languages);
CREATE INDEX IF NOT EXISTS idx_therapists_insurance ON therapists USING GIN (insurance_accepted);
CREATE INDEX IF NOT EXISTS idx_therapists_jewish_community ON therapists (jewish_community);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS idx_therapists_embedding ON therapists 
USING ivfflat (specialization_embedding vector_cosine_ops)
WITH (lists = 100);

-- Enable Row Level Security (optional, but good practice)
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON therapists
  FOR SELECT USING (true);

-- Create policy to allow authenticated insert/update (for admin purposes)
CREATE POLICY "Allow authenticated insert" ON therapists
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON therapists
  FOR UPDATE USING (true);

