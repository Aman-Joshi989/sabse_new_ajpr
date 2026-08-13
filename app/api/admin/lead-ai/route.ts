import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, company_size, budget, tech_stack } = await req.json();

    const prompt = `
      You are an elite B2B tech sales strategist. 
      Analyze the following lead and generate a personalized, hyper-targeted cold email draft.
      
      Lead Context:
      - Name: ${name}
      - Company Size: ${company_size || 'Unknown'}
      - Budget: ${budget || 'Unknown'}
      - Tech Stack: ${tech_stack || 'Unknown'}

      Output exactly 2 sections:
      [SALES STRATEGY]
      (2 sentences on how to approach this specific lead)
      
      [DRAFT EMAIL]
      (Subject line + 3-4 sentence punchy email focusing on ROI, mentioning their tech stack if applicable)
    `;

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
    });

    return NextResponse.json({ success: true, text });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
