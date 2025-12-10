import { SYSTEM_PROMPT, CHAT_MODEL } from '@/lib/openai';
import { ChatMessage } from '@/types/therapist';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const result = await streamText({
      model: openai(CHAT_MODEL), // gpt-4o-mini - fast & cost-effective for chat
      system: SYSTEM_PROMPT,
      messages: messages,
      temperature: 0.7,
      maxOutputTokens: 500,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Error processing chat', { status: 500 });
  }
}

