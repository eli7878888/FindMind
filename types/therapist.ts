export interface Therapist {
  id: string;
  name: string;
  title: string;
  bio: string;
  image_url: string;
  years_experience: number;
  email: string;
  phone: string;
  website?: string;
  
  // Specializations
  issues: string[];
  therapy_types: string[];
  
  // Demographics
  gender: string;
  languages: string[];
  populations_served: string[];
  jewish_community?: string;
  
  // Practical
  location: string;
  offers_remote: boolean;
  insurance_accepted: string[];
  session_formats: string[];
  
  // Pricing
  price_range_min: number;
  price_range_max: number;
  
  // For semantic search
  specialization_embedding?: number[];
  
  // Match score (computed)
  match_score?: number;
}

export interface UserPreferences {
  issues?: string[];
  therapy_types?: string[];
  location?: string;
  language?: string;
  insurance?: string;
  gender_preference?: string;
  populations?: string[];
  jewish_community?: string;
  session_format?: string;
  remote_preference?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

