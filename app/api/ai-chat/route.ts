import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { WAHAJ_SYSTEM_PROMPT } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI chat is not configured' },
        { status: 503 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: WAHAJ_SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json({ error: 'AI service error' }, { status: 500 });
  }
}
