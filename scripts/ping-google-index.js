require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

/**
 * Pings the Google Indexing API to instantly index or update a URL.
 * Requires GOOGLE_APPLICATION_CREDENTIALS to point to a valid service account JSON file.
 * The service account must be added as an Owner in Google Search Console.
 */
async function pingGoogleIndex(url) {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        console.warn("GOOGLE_APPLICATION_CREDENTIALS not set. Skipping Google Indexing API.");
        return;
    }

    try {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/indexing'],
        });

        const authClient = await auth.getClient();
        const indexing = google.indexing({ version: 'v3', auth: authClient });

        const res = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED'
            }
        });

        console.log(`Successfully pinged Google Indexing API for: ${url}`);
        console.log(`Response:`, res.data);
    } catch (err) {
        console.error(`Failed to ping Google Indexing API for ${url}:`, err.message);
    }
}

// Allow running from command line for testing
if (require.main === module) {
    const testUrl = process.argv[2] || "https://ajprworld.com";
    pingGoogleIndex(testUrl);
}

module.exports = { pingGoogleIndex };
