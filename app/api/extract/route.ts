import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  const { messages } = await request.json();

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    system: `Extract a structured brief from the conversation below. Respond with ONLY a single JSON object — no prose, no markdown code fences, nothing before or after it.

The JSON object must have exactly these 8 fields, all strings:
- projectType
- currentSiteLikes
- currentSiteDislikes
- visualDirection
- targetAudience
- mustHaveFeatures
- timeline
- budget

If a field was never discussed in the conversation, use an empty string "" as its value. Do not invent information that wasn't said.`,
    messages: [...messages, { role: 'assistant', content: '{' }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const brief = JSON.parse('{' + text);

  return Response.json({ brief });
}
