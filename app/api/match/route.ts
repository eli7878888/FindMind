import { openai, EMBEDDING_MODEL } from '@/lib/openai';
import { getServiceSupabase } from '@/lib/supabase';
import { UserPreferences, Therapist } from '@/types/therapist';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const preferences: UserPreferences = await req.json();

    // Create text representation of user preferences for embedding
    const preferencesText = `
      ${preferences.issues?.join(', ') || ''}
      ${preferences.therapy_types?.join(', ') || ''}
      ${preferences.populations?.join(', ') || ''}
      ${preferences.jewish_community || ''}
      ${preferences.gender_preference ? `${preferences.gender_preference} therapist` : ''}
    `.trim();

    // If no meaningful preferences, use a generic query
    const embeddingInput = preferencesText || 'general mental health therapy counseling';

    // Generate embedding for user preferences
    const embeddingResponse = await openai.embeddings.create({
      model: EMBEDDING_MODEL, // text-embedding-ada-002
      input: embeddingInput,
    });
    const userEmbedding = embeddingResponse.data[0].embedding;

    const supabase = getServiceSupabase();

    // Get ALL therapists with embeddings - let semantic search do the work!
    // Only apply the most critical hard filters
    let query = supabase
      .from('therapists')
      .select('*')
      .not('specialization_embedding', 'is', null);

    // Only apply hard filter for remote if explicitly required
    if (preferences.remote_preference === true) {
      query = query.eq('offers_remote', true);
    }

    const { data: therapists, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Error fetching therapists' }, { status: 500 });
    }

    if (!therapists || therapists.length === 0) {
      return NextResponse.json([]);
    }

    // Calculate similarity scores with preference boosting
    const therapistsWithScores = therapists.map((therapist: Therapist) => {
      // Calculate cosine similarity (base score)
      let embedding = therapist.specialization_embedding;
      if (!embedding) return { ...therapist, match_score: 0 };

      // Parse embedding if it's a string (pgvector issue)
      if (typeof embedding === 'string') {
        try {
          embedding = JSON.parse(embedding);
        } catch (e) {
          console.error('Failed to parse embedding:', e);
          return { ...therapist, match_score: 0 };
        }
      }

      // Ensure embedding is an array
      if (!Array.isArray(embedding)) return { ...therapist, match_score: 0 };

      const dotProduct = userEmbedding.reduce(
        (sum: number, val: number, i: number) => sum + val * (embedding as number[])[i],
        0
      );
      const magnitudeA = Math.sqrt(userEmbedding.reduce((sum: number, val: number) => sum + val * val, 0));
      const magnitudeB = Math.sqrt((embedding as number[]).reduce((sum: number, val: number) => sum + val * val, 0));
      const similarity = dotProduct / (magnitudeA * magnitudeB);

      // Convert to percentage (0-100)
      let match_score = Math.round((similarity + 1) * 50);

      // Apply preference boosts (instead of hard filters)
      let boostScore = 0;

      // Gender preference boost (case-insensitive)
      if (preferences.gender_preference && preferences.gender_preference !== 'no preference') {
        if (therapist.gender?.toLowerCase() === preferences.gender_preference.toLowerCase()) {
          boostScore += 10; // 10 point boost for matching gender
        }
      }

      // Location/remote boost
      if (preferences.location && therapist.location?.toLowerCase().includes(preferences.location.toLowerCase())) {
        boostScore += 5;
      }

      // Language boost
      if (preferences.language && therapist.languages?.includes(preferences.language)) {
        boostScore += 5;
      }

      // Insurance boost
      if (preferences.insurance && therapist.insurance_accepted?.includes(preferences.insurance)) {
        boostScore += 5;
      }

      // Jewish community boost
      if (preferences.jewish_community && therapist.jewish_community === preferences.jewish_community) {
        boostScore += 8;
      }

      // Session format boost
      if (preferences.session_format && therapist.session_formats?.includes(preferences.session_format)) {
        boostScore += 5;
      }

      // Apply boost but cap at 100
      match_score = Math.min(100, match_score + boostScore);

      return { ...therapist, match_score };
    });

    // Sort by match score and return top 10
    const sortedTherapists = therapistsWithScores
      .sort((a, b) => (b.match_score || 0) - (a.match_score || 0))
      .slice(0, 10);

    return NextResponse.json(sortedTherapists);
  } catch (error) {
    console.error('Match API error:', error);
    return NextResponse.json(
      { error: 'Error matching therapists' },
      { status: 500 }
    );
  }
}

