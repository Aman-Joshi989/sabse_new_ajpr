import { config } from 'dotenv';
config({ path: '.env.local' });
import { Pool } from 'pg';

async function exchange() {
  // TODO: Replace this code with your fresh authorization code!
  const code = "AQ.Ab8RN6JGvpg-gztCVDaPSs3lrKiISmQFEOBTg_5g30av7U7GYw";
  
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = 'https://ajprworld.com/api/auth/linkedin/callback';
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ DATABASE_URL is missing in .env.local");
    return;
  }

  try {
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log("LinkedIn Response:", tokenData);

    if (tokenData.access_token) {
      console.log("✅ Successfully generated access token! Saving to database...");
      
      const pool = new Pool({
        connectionString: databaseUrl,
        ssl: { rejectUnauthorized: false }
      });

      const query = `
        INSERT INTO social_tokens (platform, access_token, refresh_token, expires_at)
        VALUES ($1, $2, $3, NOW() + make_interval(secs := $4))
        ON CONFLICT (platform)
        DO UPDATE SET 
          access_token = EXCLUDED.access_token,
          refresh_token = COALESCE(EXCLUDED.refresh_token, social_tokens.refresh_token),
          expires_at = EXCLUDED.expires_at,
          created_at = NOW();
      `;
      
      await pool.query(query, [
        'linkedin', 
        tokenData.access_token, 
        tokenData.refresh_token || null, 
        tokenData.expires_in || 5184000
      ]);
      
      await pool.end();
      console.log('🎉 LinkedIn token permanently saved to the database! You are ready to publish.');
    } else {
      console.error("❌ Failed to get access_token. The authorization code might be expired.");
    }
  } catch (e) {
    console.error("Error exchanging token:", e);
  }
}

exchange();
