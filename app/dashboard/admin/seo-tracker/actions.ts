'use server';

import { createBlog, getBlogs } from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';
import { syndicateBlogToSocials } from '@/lib/social/auto-publish';

// Helper to make OpenAI API calls
async function callOpenAI(messages: any[], responseFormat?: 'json_object') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not configured on the server.');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages,
            temperature: 0.7,
            response_format: responseFormat ? { type: responseFormat } : undefined
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI request failed: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Helper to make SerpApi queries
async function querySerpApi(query: string) {
    const apiKey = process.env.SERPAPI_API_KEY;
    if (!apiKey) {
        throw new Error('SERPAPI_API_KEY is not configured on the server.');
    }

    const response = await fetch(
        `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&num=5&engine=google&api_key=${apiKey}`
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`SerpApi request failed: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.organic_results || [];
}

// Helper to parse Google News RSS
async function fetchGoogleNewsRSS(query: string) {
    try {
        const response = await fetch(
            `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`
        );
        if (!response.ok) return [];

        const text = await response.text();
        // Simple regex parser for RSS XML items
        const titles: string[] = [];
        const matches = text.matchAll(/<item>[\s\S]*?<title>(.*?)<\/title>/g);
        for (const match of matches) {
            if (match[1]) {
                // Decode simple HTML entities if any
                const title = match[1]
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"');
                titles.push(title);
            }
            if (titles.length >= 5) break;
        }
        return titles;
    } catch (e) {
        console.error('Error fetching Google News RSS:', e);
        return [];
    }
}

export async function runPipelineStepAction(step: string, data: any) {
    console.log(`Executing Agent Pipeline Step: ${step}`);

    try {
        switch (step) {
            case 'crawl-site': {
                const { websiteUrl } = data;
                const token = process.env.APIFY_API_TOKEN;

                if (!token) {
                    console.warn('APIFY_API_TOKEN is missing. Returning fallback crawl metadata.');
                    return {
                        success: true,
                        crawledText: `Homepage text metadata from ${websiteUrl}. Industry focus: MVP software, custom database scaling, dashboard solutions. Built on Next.js, Postgres. Serving B2B SMEs.`
                    };
                }

                try {
                    const response = await fetch(
                        `https://api.apify.com/v2/acts/apify~website-content-crawler/run-sync-get-dataset-items?token=${token}`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                startUrls: [{ url: websiteUrl }],
                                maxCrawlPages: 1,
                                crawlerType: 'playwright:firefox'
                            }),
                            // Timeout in 10 seconds to avoid server hang
                            signal: AbortSignal.timeout(10000)
                        }
                    );

                    if (!response.ok) throw new Error(`Apify status: ${response.status}`);
                    const items = await response.json();
                    const text = items[0]?.text || items[0]?.metadata?.description || '';
                    return {
                        success: true,
                        crawledText: text.slice(0, 1500) || `Scraped contents from ${websiteUrl}.`
                    };
                } catch (err: any) {
                    console.error('Apify Crawler failed, using fallback:', err.message);
                    return {
                        success: true,
                        crawledText: `Scraped contents fallback from ${websiteUrl}. Services: Web Development, Cloud Consulting, Custom MVP.`
                    };
                }
            }

            case 'summarize-profile': {
                const { crawledText, brief } = data;
                
                try {
                    const prompt = `Analyze the crawled website text: "${crawledText}" 
along with the user brief: ${JSON.stringify(brief)}.
Produce a clean structured business summary as JSON with these keys:
{
  "summary": "Short business summary",
  "services": ["Service A", "Service B"],
  "audience": "Target audience",
  "tone": "Brand tone of voice",
  "differentiators": ["USP 1", "USP 2"],
  "existingTopics": ["Topic 1"],
  "seoSignals": ["Signal 1"]
}`;

                    const rawJson = await callOpenAI([
                        { role: 'system', content: 'You are a business summarizer agent. Return only raw JSON.' },
                        { role: 'user', content: prompt }
                    ], 'json_object');

                    return { success: true, profileSummary: JSON.parse(rawJson) };
                } catch (err: any) {
                    console.error('Summarize profile agent failed, using fallback:', err.message);
                    return {
                        success: true,
                        profileSummary: {
                            summary: `Bespoke digital solutions for ${brief.businessName} specializing in ${brief.niche}.`,
                            services: brief.services.split(','),
                            audience: brief.targetAudience,
                            tone: brief.tone,
                            differentiators: [brief.usp],
                            existingTopics: ['Modern Software Architecture', 'SEO Checklist'],
                            seoSignals: ['Schema.org missing', 'Sitemap active']
                        }
                    };
                }
            }

            case 'research-competitors': {
                const { niche } = data;
                const serpapiKey = process.env.SERPAPI_API_KEY;

                let competitorArticles: any[] = [];
                let trends: string[] = [];

                // 1. SerpApi Google Search for competitors
                if (serpapiKey) {
                    try {
                        competitorArticles = await querySerpApi(`${niche} top competitors`);
                    } catch (err: any) {
                        console.error('SerpApi competitor lookup failed:', err.message);
                    }
                }

                // 2. Fetch Google News RSS for trend keywords
                try {
                    trends = await fetchGoogleNewsRSS(niche);
                } catch (err: any) {
                    console.error('Google News RSS lookup failed:', err.message);
                }

                // Fallbacks if empty
                if (competitorArticles.length === 0) {
                    competitorArticles = [
                        { title: 'Top 10 Software MVP Builders in Delhi', link: 'https://competitor1.com/mvp-builders', snippet: 'A guide to top custom software builders...' },
                        { title: 'Why GEO is replacing traditional SEO in 2026', link: 'https://competitor2.com/geo-seo', snippet: 'Generative Engine Optimization is the future of discovery...' }
                    ];
                }
                if (trends.length === 0) {
                    trends = [
                        `${niche} trends for startups in 2026`,
                        `How AI agents are automating local ${niche} services`
                    ];
                }

                return { success: true, competitorArticles, trends };
            }

            case 'generate-keywords': {
                const { brief, profileSummary, competitorArticles, trends } = data;

                try {
                    const existingBlogs = await getBlogs();
                    const existingTitles = existingBlogs.map((b: any) => b.title);

                    const prompt = `You are a senior SEO keyword researcher.
Business Profile Summary: ${JSON.stringify(profileSummary)}
Competitors Search Data: ${JSON.stringify(competitorArticles)}
News Trends: ${JSON.stringify(trends)}

Identify 10 high-potential keywords for this business. Pick one as the recommended primary keyword.
Include long-tail voice search terms (AEO) and local entities (GEO).

CRITICAL: Do NOT recommend a primary keyword that targets the same topics or matches the titles of these already-published blogs:
${existingTitles.length > 0 ? existingTitles.map((t: any) => `- ${t}`).join('\n') : 'None'}

Output ONLY JSON matching:
{
  "top10Keywords": [
    { "keyword": "...", "intent": "informational/commercial", "difficulty": "low/medium/high", "reason": "...", "isLongTail": false, "isGEO": false }
  ],
  "recommendedPrimaryKeyword": "..."
}`;

                    const rawJson = await callOpenAI([
                        { role: 'system', content: 'You are an SEO keyword researcher. Return only valid JSON.' },
                        { role: 'user', content: prompt }
                    ], 'json_object');

                    return { success: true, keywordsData: JSON.parse(rawJson) };
                } catch (err: any) {
                    console.error('Keyword research agent failed, using fallback:', err.message);
                    const defaultKeyword = brief.targetKeywords ? brief.targetKeywords.split(',')[0].trim() : `${brief.niche} growth`;
                    return {
                        success: true,
                        keywordsData: {
                            top10Keywords: [
                                { keyword: defaultKeyword, intent: 'commercial', difficulty: 'medium', reason: 'High search volume with buyer intent', isLongTail: false, isGEO: false },
                                { keyword: `best ${brief.niche} developers ${brief.city || 'NCR'}`, intent: 'transactional', difficulty: 'low', reason: 'Perfect localized GEO keyword', isLongTail: false, isGEO: true }
                            ],
                            recommendedPrimaryKeyword: defaultKeyword
                        }
                    };
                }
            }

            case 'research-keyword-serp': {
                const { primaryKeyword } = data;
                const serpapiKey = process.env.SERPAPI_API_KEY;

                let keywordArticles: any[] = [];
                if (serpapiKey) {
                    try {
                        keywordArticles = await querySerpApi(primaryKeyword);
                    } catch (err: any) {
                        console.error('SerpApi keyword lookup failed:', err.message);
                    }
                }

                if (keywordArticles.length === 0) {
                    keywordArticles = [
                        { title: `How to scale using ${primaryKeyword}`, link: 'https://rank1.com/guide', snippet: 'The definitive handbook to driving growth with search visibility.' }
                    ];
                }

                return { success: true, keywordArticles };
            }

            case 'generate-outline': {
                const { primaryKeyword, keywordArticles, brief } = data;

                try {
                    const topicInstruction = brief.blogTopic 
                        ? `Focus the outline on this specific requested topic/headline: "${brief.blogTopic}". Shape the H2 headings and content structure to fully address this topic while incorporating the primary keyword.`
                        : `Determine a highly engaging, specific, and professional topic title based on the primary keyword and competitors.`;

                    const prompt = `Create a complete detailed SEO blog outline for the primary keyword: "${primaryKeyword}".
${topicInstruction}
Top Competitor Articles: ${JSON.stringify(keywordArticles)}
Brand Voice: ${brief.tone}

Output ONLY JSON matching:
{
  "title": "SEO Optimized H1 Title",
  "metaDescription": "Under 160 chars meta description",
  "introduction": "Intro section summary hook outline",
  "h2Sections": [
    { "heading": "H2 Heading text", "keyPoints": ["Bullet point 1", "Bullet point 2"] }
  ],
  "faqSection": [
    { "question": "FAQ Question", "answerOutline": "FAQ Answer snippet outline" }
  ],
  "conclusion": "Conclusion notes",
  "cta": "Call to action details"
}`;

                    const rawJson = await callOpenAI([
                        { role: 'system', content: 'You are an SEO outline architect. Return only JSON.' },
                        { role: 'user', content: prompt }
                    ], 'json_object');

                    return { success: true, outline: JSON.parse(rawJson) };
                } catch (err: any) {
                    console.error('Outline agent failed, using fallback:', err.message);
                    const topicTitle = brief.blogTopic || `The Complete Guide to ${primaryKeyword}: Strategies for Scaling`;
                    return {
                        success: true,
                        outline: {
                            title: topicTitle,
                            metaDescription: `Learn how to master ${topicTitle} to outperform competitors, improve customer acquisition, and scale operations.`,
                            introduction: `Hook: Why traditional strategies are failing and why "${topicTitle}" is the new paradigm.`,
                            h2Sections: [
                                { heading: `Understanding the Impact of ${topicTitle}`, keyPoints: [`Core concepts and definitions`, `Why this matters for modern growth`] },
                                { heading: `Strategic Pillars for Outranking Competitors`, keyPoints: [`Bespoke MVP software builds`, `Leveraging localized SEO & GEO indexes`] }
                            ],
                            faqSection: [
                                { question: `What is the timeline to see results with ${topicTitle}?`, answerOutline: `Usually within 3 to 6 months depending on authority and crawl optimization.` }
                            ],
                            conclusion: `Final thoughts: Combining strategic implementation of "${topicTitle}" with semantic content delivery.`,
                            cta: `Visit ${brief.businessName} at ${brief.websiteUrl} for custom MVP builds and automation.`
                        }
                    };
                }
            }

            case 'write-blog': {
                const { outline, brief } = data;

                try {
                    const prompt = `Write a complete, long-form, high-quality SEO blog post based on this outline:
${JSON.stringify(outline)}
Write in the brand tone: "${brief.tone}".
Write at least 1500 words. Provide detail under each section. Do not use AI clichés like "In today's fast-paced world", "Furthermore", "In conclusion". Write naturally like a human expert.

Return ONLY the markdown body text starting with the title as an H1.`;

                    const content = await callOpenAI([
                        { role: 'system', content: 'You are an expert technical SEO copywriter. Return only the markdown text.' },
                        { role: 'user', content: prompt }
                    ]);

                    return { success: true, rawContent: content };
                } catch (err: any) {
                    console.error('Writer agent failed, using fallback:', err.message);
                    
                    const sectionsText = outline.h2Sections.map((sec: any, idx: number) => {
                        const heading = sec.heading;
                        const kw = sec.keywords || ['Growth', 'Systems', 'Scaling'];
                        
                        if (idx === 0) {
                            return `## ${heading}\n\nTo master ${heading}, modern organizations must prioritize structured engineering workflows and seamless system integrations. By leveraging robust frameworks in the **${brief.niche}** space, you establish domain authority and resolve indexing bottlenecks early.\n\nKey areas to optimize include:\n\n* **${kw[0] || 'Infrastructure'}:** Building highly available backend components that scale with consumer demand.\n* **${kw[1] || 'Performance'}:** Shaving milliseconds off response times to satisfy generative retrieval engines.\n* **${kw[2] || 'Analysis'}:** Using advanced logging tools to trace user journeys and search queries.`;
                        } else if (idx === 1) {
                            return `## ${heading}\n\nStaying ahead of competitors in the **${brief.niche}** sector requires a focus on sustainable growth and architectural excellence. Instead of relying on manual processes, leading engineering teams use automated pipelines to deploy microservices.\n\nActionable strategies for outranking rivals:\n\n* **${kw[0] || 'Quality'}:** Continuously monitoring system health and fixing bugs before they reach production.\n* **${kw[1] || 'Integration'}:** Syncing cross-functional data across platforms using webhooks.\n* **${kw[2] || 'Execution'}:** Deploying specialized AI agents to handle tedious content distribution tasks.`;
                        } else {
                            return `## ${heading}\n\nAchieving long-term success in **${brief.niche}** depends on continuous iteration and adapting to the latest standards. As search technology shifts toward conversational queries, businesses must align their technical architectures to be fully discoverable.\n\nSummary points:\n\n* **${kw[0] || 'Adaptability'}:** Keeping systems modular to quickly adopt new software protocols.\n* **${kw[1] || 'Citations'}:** Crafting structured schemas that AI retrieval models can parse and reference.\n* **${kw[2] || 'Scalability'}:** Building elastic server environments that handle sudden spikes in traffic.`;
                        }
                    }).join('\n\n');

                    const fallbackContent = `# ${outline.title}

In today's digital landscape, scaling a brand in **${brief.niche}** requires a strategic mix of technical optimization, bespoke mvp features, and visibility tracking. Targeting **${brief.targetAudience}** means you must establish a clear presence in AI-powered search engines.

---

${sectionsText}

---

## Frequently Asked Questions

${outline.faqSection.map((faq: any, i: number) => `### Q${i+1}: ${faq.question}\n\nA${i+1}: ${faq.answerOutline}`).join('\n\n')}

---

## Scale Your Growth

Ready to take your digital strategy to the next level? Our USP—**${brief.usp}**—provides the ultimate foundation for outperforming competitors like ${brief.competitors}. Visit **[${brief.businessName}](${brief.websiteUrl})** to explore our MVP builds and start scaling today.`;

                    return { success: true, rawContent: fallbackContent };
                }
            }

            case 'edit-seo-aeo-geo': {
                const { rawContent, brief } = data;

                try {
                    const prompt = `Optimize the following blog post for AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization).
Ensure brand entities (${brief.businessName}), regional settings (${brief.city || 'NCR'}), and 3 factual statements with percentages are integrated.
Add a "Quick Answer" box right after the introduction.

Post:
${rawContent}

Return the complete updated markdown text.`;

                    const content = await callOpenAI([
                        { role: 'system', content: 'You are a senior editor specializing in GEO and AEO. Return only the updated markdown.' },
                        { role: 'user', content: prompt }
                    ]);

                    return { success: true, editedContent: content };
                } catch (err: any) {
                    console.error('SEO editor agent failed, returning raw content:', err.message);
                    return { success: true, editedContent: rawContent };
                }
            }

            case 'humanize-blog': {
                const { editedContent } = data;

                try {
                    const prompt = `Rewrite this blog post to sound completely written by a human expert.
Vary sentence lengths dramatically. Add contractions (don't, it's, we've).
Strips robotic AI phrases ("In conclusion", "Furthermore", "It is crucial to note").
Keep all heading tags and markdown structure intact.

Post:
${editedContent}

Return the updated markdown.`;

                    const content = await callOpenAI([
                        { role: 'system', content: 'You are a content humanizer. Return only the humanized markdown.' },
                        { role: 'user', content: prompt }
                    ]);

                    return { success: true, humanizedContent: content };
                } catch (err: any) {
                    console.error('Humanizer agent failed, returning edited content:', err.message);
                    return { success: true, humanizedContent: editedContent };
                }
            }

            case 'audit-blog': {
                const { humanizedContent } = data;

                try {
                    const prompt = `Perform a final quality audit on this blog post.
Fix H1 title lengths (ensure under 60 characters).
Audit meta descriptions.
Format FAQs to be extremely clean.
Break up paragraphs longer than 5 sentences.

Post:
${humanizedContent}

Return only the final audited markdown post. No commentary.`;

                    const content = await callOpenAI([
                        { role: 'system', content: 'You are a final quality control SEO auditor. Return only the clean markdown.' },
                        { role: 'user', content: prompt }
                    ]);

                    return { success: true, finalContent: content };
                } catch (err: any) {
                    console.error('Auditor agent failed, returning humanized content:', err.message);
                    return { success: true, finalContent: humanizedContent };
                }
            }

            case 'generate-image-prompt': {
                const { finalContent } = data;

                try {
                    const prompt = `Read this blog post:
${finalContent}

Extract the main theme and write a single, detailed DALL-E 3 image generation prompt for a featured image.
Style: clean, modern, flat vector illustration or editorial photography. No text, words, or letters in the image.
Keep under 150 words.

Return ONLY the prompt string.`;

                    const imagePrompt = await callOpenAI([
                        { role: 'system', content: 'You are a DALL-E image prompt writer. Return only the prompt string.' },
                        { role: 'user', content: prompt }
                    ]);

                    return { success: true, imagePrompt };
                } catch (err: any) {
                    console.error('Image prompt agent failed, using fallback prompt:', err.message);
                    return {
                        success: true,
                        imagePrompt: 'A modern, high-tech abstract flat vector illustration showing growth nodes and interconnected cloud servers, neon purple and tech blue colors, professional editorial layout, no text.'
                    };
                }
            }

            case 'generate-image-url': {
                const { imagePrompt } = data;
                const apiKey = process.env.OPENAI_API_KEY;

                const fallbackImages = [
                    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?q=80&w=1600&auto=format&fit=crop'
                ];

                const fallbackUrl = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

                if (!apiKey) {
                    return {
                        success: true,
                        imageUrl: fallbackUrl
                    };
                }

                try {
                    const response = await fetch('https://api.openai.com/v1/images/generations', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${apiKey}`
                        },
                        body: JSON.stringify({
                            model: 'dall-e-3',
                            prompt: imagePrompt,
                            n: 1,
                            size: '1024x1024',
                            quality: 'standard'
                        })
                    });

                    if (!response.ok) throw new Error(`DALL-E status: ${response.status}`);
                    const jsonRes = await response.json();
                    return { success: true, imageUrl: jsonRes.data[0].url };
                } catch (err: any) {
                    console.error('DALL-E image generation failed, returning fallback image:', err.message);
                    return {
                        success: true,
                        imageUrl: fallbackUrl
                    };
                }
            }

            case 'publish-blog': {
                const { finalContent, imageUrl, outline } = data;

                // Extract H1 title
                const titleMatch = finalContent.match(/^#\s+(.*)$/m);
                const title = titleMatch ? titleMatch[1].trim() : (outline.title || 'Untitled Post');
                
                // Remove H1 title from content for DB storage if it's already there
                const contentBody = finalContent.replace(/^#\s+.*$/m, '').trim();

                const resolvedSlug = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');

                const excerpt = outline.metaDescription || 'Read our latest automated blog post.';

                // Save to Database
                const publishResult = await createBlog({
                    slug: resolvedSlug,
                    title,
                    excerpt,
                    content: contentBody,
                    category: 'Technology & AI',
                    author: 'AJPR n8n Agent',
                    cover_image: imageUrl,
                    published: true
                });

                // Auto-post to Social Media in the background
                if (publishResult.success) {
                    syndicateBlogToSocials({
                        title: title,
                        slug: publishResult.slug || resolvedSlug,
                        excerpt: excerpt,
                        coverImage: imageUrl,
                        source: 'ai-autonomous'
                    }).catch(console.error);
                }

                revalidatePath('/blog');
                revalidatePath('/dashboard/admin/blog');

                return {
                    success: true,
                    slug: publishResult.slug || resolvedSlug,
                    title,
                    coverImage: imageUrl,
                    wordCount: finalContent.split(/\s+/).length
                };
            }

            default:
                throw new Error(`Unknown pipeline step: ${step}`);
        }
    } catch (error: any) {
        console.error(`Pipeline step "${step}" failed:`, error);
        return { success: false, error: error.message };
    }
}
