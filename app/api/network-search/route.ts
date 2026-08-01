import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(req: Request) {
    const { query } = await req.json();
    
    if (!query) {
        return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const url = process.env.DATABASE_URL;
    if (!url) {
        return NextResponse.json({ error: 'DATABASE_URL is not set' }, { status: 500 });
    }
    const client = new Client({ connectionString: url });

    try {
        await client.connect();

        // 1. Convert query to vector embedding
        // Ideally: const { embedding } = await embed({ model: openai.embedding('text-embedding-3-small'), value: query });
        // Since API keys are invalid in .env.local, we mock the vector here for the MVP.
        const mockQueryVector = Array.from({ length: 768 }, () => Math.random() * 2 - 1);
        const vectorString = `[${mockQueryVector.join(',')}]`;

        // 2. Perform Cosine Similarity Search (<=>)
        // We select the top 3 closest contacts.
        const searchRes = await client.query(`
            SELECT 
                c.name, c.company, c.job_title, c.email, c.linkedin_url, c.summary,
                i.description as interaction, i.source,
                1 - (e.embedding <=> $1::vector) as similarity
            FROM network_embeddings e
            JOIN network_contacts c ON e.contact_id = c.id
            LEFT JOIN network_interactions i ON i.contact_id = c.id
            ORDER BY e.embedding <=> $1::vector
            LIMIT 3;
        `, [vectorString]);

        await client.end();

        return NextResponse.json({
            results: searchRes.rows
        });
    } catch (err: any) {
        console.error('Vector Search Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
