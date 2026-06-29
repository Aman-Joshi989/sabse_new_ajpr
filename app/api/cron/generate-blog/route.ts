import { NextRequest, NextResponse } from 'next/server';
import { runPipelineStepAction } from '@/app/dashboard/admin/seo-tracker/actions';
import { getBlogs } from '@/lib/db/queries';

async function executeDailyBlogPipeline(req: NextRequest) {
  // 1. Authenticate using AJPR_API_KEY
  const apiKey = process.env.AJPR_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'AJPR_API_KEY is not configured on the server environment.' },
      { status: 500 }
    );
  }

  // Check header or query parameter
  const authHeader = req.headers.get('Authorization') || req.headers.get('x-api-key');
  const queryKey = req.nextUrl.searchParams.get('key');
  const providedKey = (queryKey || authHeader?.replace('Bearer ', '') || '').trim();

  if (providedKey !== apiKey) {
    return NextResponse.json(
      { error: 'Unauthorized. Invalid or missing API key.' },
      { status: 401 }
    );
  }

  try {
    // 2. Fetch existing blogs to avoid duplicate topics
    const existingBlogs = await getBlogs();
    const existingTitles = existingBlogs.map((b: any) => b.title);

    // 3. Define default brief parameters for AJPR World
    const brief = {
      businessName: 'AJPR World',
      websiteUrl: 'https://ajprworld.com',
      niche: 'AI MVP Development & SEO Solutions',
      businessType: 'B2B',
      services: 'Custom MVP builds, dynamic branding, and technical GEO optimization for businesses.',
      targetAudience: 'Tech startups, SMEs, and digital agencies looking to scale fast.',
      competitors: 'Traditional software consultancies, generic marketing agencies',
      geoFocus: 'National',
      city: 'New Delhi',
      tone: 'Expert/Technical',
      targetKeywords: 'GEO search optimization, custom software MVP builders',
      usp: 'Fast 4-week MVP development cycle with integrated AI answer engine visibility',
      blogTopic: ''
    };

    // 4. Call OpenAI to generate a brand new unique topic
    const openAiKey = process.env.OPENAI_API_KEY;
    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY is not configured on the server.');
    }

    const messages = [
      {
        role: 'system',
        content: 'You are a creative SEO content strategist. Generate a single highly specific, relevant, and search-optimized blog headline for AJPR World. The topic must focus on tech MVP development, AI-driven automation systems, startup scaling, or Generative Engine Optimization (GEO). Do NOT generate duplicate topics.'
      },
      {
        role: 'user',
        content: `Here are the titles of existing articles we have already published:
${existingTitles.length > 0 ? existingTitles.map((t: any) => `- ${t}`).join('\n') : 'None'}

Please suggest ONE brand new, highly compelling blog topic headline (output only the plain title, no quotes, introduction, or explanation):`
      }
    ];

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.8
      })
    });

    if (!openAiResponse.ok) {
      const errorText = await openAiResponse.text();
      throw new Error(`OpenAI topic generation failed: ${errorText}`);
    }

    const openAiData = await openAiResponse.json();
    const suggestedTopic = openAiData.choices[0].message.content.trim().replace(/^"(.*)"$/, '$1');
    brief.blogTopic = suggestedTopic;
    console.log(`[Cron] Selected Daily Topic: "${suggestedTopic}"`);

    // 5. Run the 27-node agent pipeline steps sequentially
    console.log('[1/13] Crawling site...');
    const crawlRes = await runPipelineStepAction('crawl-site', { websiteUrl: brief.websiteUrl });
    if (!crawlRes.success) throw new Error((crawlRes as any).error || 'Failed site crawl');
    const crawledText = (crawlRes as any).crawledText;

    console.log('[2/13] Summarizing profile...');
    const summaryRes = await runPipelineStepAction('summarize-profile', { crawledText, brief });
    if (!summaryRes.success) throw new Error((summaryRes as any).error || 'Failed summary');
    const profileSummary = (summaryRes as any).profileSummary;

    console.log('[3/13] Crawling competitors...');
    const researchRes = await runPipelineStepAction('research-competitors', { niche: brief.niche });
    if (!researchRes.success) throw new Error((researchRes as any).error || 'Failed competitor research');
    const { competitorArticles, trends } = researchRes as any;

    console.log('[4/13] Generating keyword strategy...');
    const kwRes = await runPipelineStepAction('generate-keywords', { brief, profileSummary, competitorArticles, trends });
    if (!kwRes.success) throw new Error((kwRes as any).error || 'Failed keyword research');
    const keywordsData = (kwRes as any).keywordsData;
    const primaryKeyword = keywordsData.recommendedPrimaryKeyword;

    console.log('[5/13] Researching primary keyword SERP...');
    const keywordSerpRes = await runPipelineStepAction('research-keyword-serp', { primaryKeyword });
    if (!keywordSerpRes.success) throw new Error((keywordSerpRes as any).error || 'Failed keyword SERP crawl');
    const keywordArticles = (keywordSerpRes as any).keywordArticles;

    console.log('[6/13] Creating outline...');
    const outlineRes = await runPipelineStepAction('generate-outline', { primaryKeyword, keywordArticles, brief });
    if (!outlineRes.success) throw new Error((outlineRes as any).error || 'Failed outline creation');
    const outline = (outlineRes as any).outline;

    console.log('[7/13] Writing draft...');
    const writeRes = await runPipelineStepAction('write-blog', { outline, brief });
    if (!writeRes.success) throw new Error((writeRes as any).error || 'Failed draft writing');
    const rawContent = (writeRes as any).rawContent;

    console.log('[8/13] Injecting SEO & GEO optimizations...');
    const editRes = await runPipelineStepAction('edit-seo-aeo-geo', { rawContent, brief });
    if (!editRes.success) throw new Error((editRes as any).error || 'Failed SEO editing');
    const editedContent = (editRes as any).editedContent;

    console.log('[9/13] Humanizing tone...');
    const humanRes = await runPipelineStepAction('humanize-blog', { editedContent });
    if (!humanRes.success) throw new Error((humanRes as any).error || 'Failed humanization');
    const humanizedContent = (humanRes as any).humanizedContent;

    console.log('[10/13] Auditing content metrics...');
    const auditRes = await runPipelineStepAction('audit-blog', { humanizedContent });
    if (!auditRes.success) throw new Error((auditRes as any).error || 'Failed audit');
    const finalContent = (auditRes as any).finalContent;

    console.log('[11/13] Creating featured image prompt...');
    const imagePromptRes = await runPipelineStepAction('generate-image-prompt', { finalContent });
    if (!imagePromptRes.success) throw new Error((imagePromptRes as any).error || 'Failed image prompt');
    const imagePrompt = (imagePromptRes as any).imagePrompt;

    console.log('[12/13] Drawing featured cover art...');
    const imageUrlRes = await runPipelineStepAction('generate-image-url', { imagePrompt });
    if (!imageUrlRes.success) throw new Error((imageUrlRes as any).error || 'Failed image url');
    const imageUrl = (imageUrlRes as any).imageUrl;

    console.log('[13/13] Saving and publishing post...');
    const publishRes = await runPipelineStepAction('publish-blog', { finalContent, imageUrl, outline });
    if (!publishRes.success) throw new Error((publishRes as any).error || 'Failed publishing');

    console.log(`[Cron Success] Published: "${(publishRes as any).title}"`);

    return NextResponse.json({
      success: true,
      message: 'Daily blog post successfully generated and published!',
      topic: suggestedTopic,
      slug: (publishRes as any).slug,
      title: (publishRes as any).title,
      wordCount: (publishRes as any).wordCount
    }, { status: 201 });

  } catch (err: any) {
    console.error('Error in daily blog generation cron:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return executeDailyBlogPipeline(req);
}

export async function POST(req: NextRequest) {
  return executeDailyBlogPipeline(req);
}
