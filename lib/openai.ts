import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Model configuration for cost optimization
export const CHAT_MODEL = "gpt-4o-mini";           // Fast & cheap for conversation
export const EXTRACTION_MODEL = "gpt-4o";          // Accurate for structured extraction
export const EXTRACTION_MODEL_CHEAP = "gpt-4o-mini"; // Fallback if budget tight
export const EMBEDDING_MODEL = "text-embedding-ada-002"; // For semantic search

export const SYSTEM_PROMPT = `You are a warm, empathetic AI assistant helping people find the right therapist. Your goal is to have a natural, supportive conversation to understand their needs.

Ask about:
- What brings them to therapy (issues, concerns, struggles)
- What type of therapy approach they prefer (if any)
- Practical needs (location, remote/in-person, insurance)
- Personal preferences (therapist gender, cultural/religious background)
- Session format preference (individual, couples, family, group)

Be conversational and empathetic. Don't ask all questions at once - let the conversation flow naturally. Show understanding and support. After gathering enough information (typically 3-5 exchanges), let them know you can help find matches.`;

export const EXTRACTION_PROMPT = `Extract structured information from this conversation about therapy preferences. Return a JSON object with the following fields (use null if not mentioned):

{
  "issues": string[] - mental health concerns (anxiety, depression, trauma, etc.),
  "therapy_types": string[] - preferred approaches (CBT, DBT, psychodynamic, etc.),
  "location": string - city or area preference,
  "language": string - preferred language,
  "insurance": string - insurance provider,
  "gender_preference": string - preferred therapist gender,
  "populations": string[] - specific populations (LGBTQ+, religious groups, etc.),
  "jewish_community": string - if mentioned: Chasidish, Yeshivish, Modern Orthodox, etc.,
  "session_format": string - individual, couples, family, or group,
  "remote_preference": boolean - preference for remote/online therapy
}`;

