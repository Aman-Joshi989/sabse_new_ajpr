import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name = 'Tech Founder',
      role = 'Systems Architect',
      series = 'Startup Titans Vol. 1',
      outfit = 'black tech hoodie and sneakers',
      accessories = ['MacBook Pro', 'Cold Brew Cup', 'Mechanical Keyboard'],
      boxTheme = 'retro-hasbro',
      customPrompt = ''
    } = body;

    // Engineered ultra-high fidelity prompt formula for collectible blister packaging
    const accessoriesStr = Array.isArray(accessories) ? accessories.join(', ') : accessories;
    
    const themeDescriptions: Record<string, string> = {
      'retro-hasbro': '80s and 90s vintage Hasbro toy packaging, retro bold typography, vibrant gradient cardboard card',
      'cyberpunk-neon': 'cyberpunk 2077 high-tech toy packaging, neon glowing grid lines, dark synthwave cardboard card',
      'minimalist-tech': 'ultra-clean minimalist matte white and silver luxury tech packaging, Apple design aesthetic, sleek futuristic toy',
      'comic-book': 'vintage classic comic book blister pack, halftone dot texture, bold graphic novel illustration, superhero collectible',
      'gold-edition': 'luxury black obsidian cardboard with metallic 24K gold foil trim, premium VIP collector edition toy box'
    };

    const chosenTheme = themeDescriptions[boxTheme] || themeDescriptions['retro-hasbro'];

    const engineeredPrompt = customPrompt.trim()
      ? customPrompt
      : `A mint-in-box collectible 3D action figure of "${name}", who is a ${role}, wearing ${outfit}, standing in a heroic confident pose sealed inside a clear molded plastic blister bubble mounted on a printed cardboard toy blister card with a peg hanger cutout at the top. The cardboard packaging proudly displays "${series.toUpperCase()}" at the top and "${name.toUpperCase()}" below. To the side inside molded transparent plastic trays are miniature toy accessories: ${accessoriesStr}. ${chosenTheme}, hyper-detailed plastic figurine with visible joints, studio product photography, 4k resolution, crisp commercial packaging lighting.`;

    const apiKey = process.env.OPENAI_API_KEY;

    // Attempt direct DALL-E 3 generation if API key is configured
    if (apiKey) {
      try {
        const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: engineeredPrompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
          }),
        });

        const dalleData = await dalleRes.json();
        if (dalleRes.ok && dalleData?.data?.[0]?.url) {
          return NextResponse.json({
            success: true,
            imageUrl: dalleData.data[0].url,
            prompt: engineeredPrompt,
            revisedPrompt: dalleData.data[0].revised_prompt || engineeredPrompt,
          });
        } else {
          console.warn('DALL-E 3 generation notice:', dalleData?.error?.message);
        }
      } catch (dalleErr: any) {
        console.warn('DALL-E 3 network notice:', dalleErr?.message);
      }
    }

    // Fallback response with the high-precision prompt and ready-to-use configuration
    return NextResponse.json({
      success: false,
      message: 'Direct DALL-E 3 rendering queued. You can copy this prompt directly into Midjourney, Flux, or DALL-E, or use the interactive 3D Box generator below.',
      prompt: engineeredPrompt,
    });
  } catch (err: any) {
    console.error('Action figure generation error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
