require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const { embed } = require('ai');
const { openai } = require('@ai-sdk/openai');

const url = process.env.DATABASE_URL;
const client = new Client({ connectionString: url });

const MOCK_CONTACTS = [
    {
        name: "Sarah Jenkins",
        company: "MedTech Innovators",
        job_title: "VP of Engineering",
        email: "sarah.j@medtech.example.com",
        linkedin_url: "https://linkedin.com/in/sarahjenkins",
        summary: "VP of Engineering at MedTech Innovators. Met at the AI Healthcare Summit 2025. They are looking to implement custom LLMs for diagnostic pipelines.",
        interaction_desc: "Had a 30 min intro call on Google Meet. Discussed how AJPR World can build an MVP for them. They have budget for Q3.",
        source: "calendar"
    },
    {
        name: "David Chen",
        company: "Urban Real Estate",
        job_title: "Head of Digital Transformation",
        email: "david@urbanre.example.com",
        linkedin_url: "https://linkedin.com/in/davidchen",
        summary: "Head of Digital at a major commercial real estate firm. Needs a chatbot to automate property inquiries.",
        interaction_desc: "Emailed back and forth last month about pricing for an AI MVP.",
        source: "gmail"
    },
    {
        name: "Elena Rodriguez",
        company: "FinSecure",
        job_title: "Founder & CEO",
        email: "elena@finsecure.example.com",
        linkedin_url: "https://linkedin.com/in/elenarod",
        summary: "Founder of a fintech startup focused on fraud detection. We share a mutual connection, John Smith.",
        interaction_desc: "John intro'd us via LinkedIn. Grabbed coffee in SF. She might need AI agents for customer support.",
        source: "linkedin"
    }
];

async function seedDB() {
    try {
        await client.connect();

        for (const contact of MOCK_CONTACTS) {
            // Insert Contact
            const contactRes = await client.query(
                `INSERT INTO network_contacts (name, company, job_title, email, linkedin_url, summary) 
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                [contact.name, contact.company, contact.job_title, contact.email, contact.linkedin_url, contact.summary]
            );
            const contactId = contactRes.rows[0].id;

            // Insert Interaction
            await client.query(
                `INSERT INTO network_interactions (contact_id, interaction_date, description, source) 
                 VALUES ($1, NOW(), $2, $3)`,
                [contactId, contact.interaction_desc, contact.source]
            );

            // Generate Embedding based on their profile and our interaction
            const textToEmbed = `
Name: ${contact.name}
Company: ${contact.company}
Title: ${contact.job_title}
Background: ${contact.summary}
Interaction context: ${contact.interaction_desc}`;

            // Mocking a 768-dimensional vector since the OpenAI Project does not have access to text-embedding models
            const mockEmbedding = Array.from({ length: 768 }, () => Math.random() * 2 - 1);
            
            // pgvector format requires '[val1, val2, ...]' string representation
            const vectorString = `[${mockEmbedding.join(',')}]`;

            // Insert Embedding
            await client.query(
                `INSERT INTO network_embeddings (contact_id, embedding) VALUES ($1, $2)`,
                [contactId, vectorString]
            );

            console.log(`✅ Seeded contact: ${contact.name}`);
        }

        console.log('Finished seeding DB.');
        await client.end();
    } catch (err) {
        console.error('Error seeding DB:', err);
        process.exit(1);
    }
}

seedDB();
