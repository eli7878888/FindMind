import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Get filter parameters
    const location = searchParams.get('location');
    const issue = searchParams.get('issue');
    const therapyType = searchParams.get('therapy_type');
    const sessionFormat = searchParams.get('session_format');
    const remote = searchParams.get('remote');
    const insurance = searchParams.get('insurance');
    const jewishCommunity = searchParams.get('jewish_community');
    const gender = searchParams.get('gender');
    const search = searchParams.get('search');

    // Start building query
    let query = supabase.from('therapists').select('*');

    // Apply filters
    if (location) {
      query = query.or(`location.ilike.%${location}%,offers_remote.eq.true`);
    }

    if (issue) {
      query = query.contains('issues', [issue]);
    }

    if (therapyType) {
      query = query.contains('therapy_types', [therapyType]);
    }

    if (sessionFormat) {
      query = query.contains('session_formats', [sessionFormat]);
    }

    if (remote === 'true') {
      query = query.eq('offers_remote', true);
    }

    if (insurance) {
      query = query.contains('insurance_accepted', [insurance]);
    }

    if (jewishCommunity) {
      query = query.eq('jewish_community', jewishCommunity);
    }

    if (gender) {
      query = query.eq('gender', gender);
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,bio.ilike.%${search}%,issues.cs.{${search}}`
      );
    }

    // Order by experience
    query = query.order('years_experience', { ascending: false });

    const { data: therapists, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Error fetching therapists' }, { status: 500 });
    }

    return NextResponse.json(therapists || []);
  } catch (error) {
    console.error('Therapists API error:', error);
    return NextResponse.json(
      { error: 'Error fetching therapists' },
      { status: 500 }
    );
  }
}

