import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// We rely on standard GOOGLE_APPLICATION_CREDENTIALS being set in the environment
// or explicitly provided in the code.
const SCOPES = ['https://www.googleapis.com/auth/business.manage'];

export async function getGBPAuthClient() {
  const client = new google.auth.GoogleAuth({
    scopes: SCOPES,
  });
  return await client.getClient();
}

/**
 * Creates a local post (like an offer or a standard post) on the specified Google Business Profile location.
 */
export async function createLocalPost(title: string, summary: string, postUrl: string) {
  const accountId = process.env.GBP_ACCOUNT_ID;
  const locationId = process.env.GBP_LOCATION_ID;

  if (!accountId || !locationId) {
    throw new Error('GBP_ACCOUNT_ID and GBP_LOCATION_ID must be set in environment variables');
  }

  const authClient = await getGBPAuthClient();
  const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts`;

  try {
    const response = await authClient.request({
      url,
      method: 'POST',
      data: {
        languageCode: 'en-US',
        summary: `${title}\n\n${summary}`,
        callToAction: {
          actionType: 'LEARN_MORE',
          url: postUrl,
        },
        topicType: 'STANDARD',
      },
    });

    console.log('Successfully created GBP local post:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating GBP local post:', error);
    throw error;
  }
}
