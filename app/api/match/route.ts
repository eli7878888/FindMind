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
    `.trim();

    // Generate embedding for user preferences
    const embeddingResponse = await openai.embeddings.create({
      model: EMBEDDING_MODEL, // text-embedding-ada-002
      input: preferencesText,
    });
    const userEmbedding = embeddingResponse.data[0].embedding;

    const supabase = getServiceSupabase();

    // Build the query with filters
    let query = supabase
      .from('therapists')
      .select('*')
      .not('specialization_embedding', 'is', null);

    // Apply filters based on preferences
    if (preferences.location) {
      query = query.or(`location.ilike.%${preferences.location}%,offers_remote.eq.true`);
    }

    if (preferences.gender_preference && preferences.gender_preference !== 'no preference') {
      query = query.eq('gender', preferences.gender_preference);
    }

    if (preferences.language) {
      query = query.contains('languages', [preferences.language]);
    }

    if (preferences.insurance) {
      query = query.contains('insurance_accepted', [preferences.insurance]);
    }

    if (preferences.jewish_community) {
      query = query.eq('jewish_community', preferences.jewish_community);
    }

    if (preferences.session_format) {
      query = query.contains('session_formats', [preferences.session_format]);
    }

    if (preferences.remote_preference) {
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

    // Calculate similarity scores
    const therapistsWithScores = therapists.map((therapist: Therapist) => {
      // Calculate cosine similarity
      const embedding = therapist.specialization_embedding;
      if (!embedding) return { ...therapist, match_score: 0 };

      const dotProduct = userEmbedding.reduce(
        (sum: number, val: number, i: number) => sum + val * embedding[i],
        0
      );
      const magnitudeA = Math.sqrt(userEmbedding.reduce((sum: number, val: number) => sum + val * val, 0));
      const magnitudeB = Math.sqrt(embedding.reduce((sum: number, val: number) => sum + val * val, 0));
      const similarity = dotProduct / (magnitudeA * magnitudeB);

      // Convert to percentage (0-100)
      const match_score = Math.round((similarity + 1) * 50);

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

