import { openai, EXTRACTION_PROMPT, EXTRACTION_MODEL, EXTRACTION_MODEL_CHEAP } from '@/lib/openai';
import { ChatMessage, UserPreferences } from '@/types/therapist';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    // Convert conversation to text
    const conversationText = messages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    let response;
    try {
      // Try with the more accurate model first (gpt-4o)
      response = await openai.chat.completions.create({
        model: EXTRACTION_MODEL,
        messages: [
          { role: 'system', content: EXTRACTION_PROMPT },
          { role: 'user', content: conversationText },
        ],
        temperature: 0,
        response_format: { type: 'json_object' },
      });
    } catch (primaryError) {
      // Fallback to cheaper model if rate limit or budget issues
      console.warn('Primary extraction model failed, using fallback:', primaryError);
      response = await openai.chat.completions.create({
        model: EXTRACTION_MODEL_CHEAP,
        messages: [
          { role: 'system', content: EXTRACTION_PROMPT },
          { role: 'user', content: conversationText },
        ],
        temperature: 0,
        response_format: { type: 'json_object' },
      });
    }

    const extracted = JSON.parse(response.choices[0].message.content || '{}') as UserPreferences;

    return NextResponse.json(extracted);
  } catch (error) {
    console.error('Extract API error:', error);
    return NextResponse.json(
      { error: 'Error extracting preferences' },
      { status: 500 }
    );
  }
}

