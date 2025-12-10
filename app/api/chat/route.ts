import { openai, SYSTEM_PROMPT, CHAT_MODEL } from '@/lib/openai';
import { ChatMessage } from '@/types/therapist';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const response = await openai.chat.completions.create({
      model: CHAT_MODEL, // gpt-4o-mini - fast & cost-effective for chat
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Convert OpenAI stream to a format the client can consume
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Error processing chat', { status: 500 });
  }
}

