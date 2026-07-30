import { getSocialToken } from './db/queries';

export interface LinkedInPostOptions {
  text: string;
  articleUrl?: string;
  articleTitle?: string;
  articleDescription?: string;
  companyId: string;
  target?: 'person' | 'company' | 'both';
}

export async function publishToLinkedIn({
  text,
  articleUrl,
  articleTitle,
  articleDescription,
  companyId,
  target = 'both',
}: LinkedInPostOptions) {
  try {
    const tokenRecord = await getSocialToken('linkedin');
    
    if (!tokenRecord || !tokenRecord.access_token) {
      throw new Error('No LinkedIn access token found in database.');
    }
    
    const accessToken = tokenRecord.access_token;
    
    const results = {
      person: { attempted: false, success: false, error: null as any, data: null as any },
      company: { attempted: false, success: false, error: null as any, data: null as any },
    };

    // Helper function to send the ugcPost payload
    const sendPost = async (authorUrn: string) => {
      const payload: any = {
        author: authorUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: text,
            },
            shareMediaCategory: articleUrl ? 'ARTICLE' : 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };

      if (articleUrl) {
        payload.specificContent['com.linkedin.ugc.ShareContent'].media = [
          {
            status: 'READY',
            description: { text: articleDescription || '' },
            originalUrl: articleUrl,
            title: { text: articleTitle || '' },
          },
        ];
      }

      const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${await response.text()}`);
      }
      return await response.json();
    };

    // 1. Post to Personal Profile
    if (target === 'person' || target === 'both') {
      results.person.attempted = true;
      try {
        const userReq = await fetch('https://api.linkedin.com/v2/userinfo', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const userData = await userReq.json();
        
        if (!userData.sub) throw new Error('Could not fetch user ID (sub) from LinkedIn');
        
        const data = await sendPost(`urn:li:person:${userData.sub}`);
        results.person.success = true;
        results.person.data = data;
      } catch (e: any) {
        results.person.error = e.message;
        console.error('Personal post failed:', e.message);
      }
    }

    // 2. Post to Company Page
    if (target === 'company' || target === 'both') {
      results.company.attempted = true;
      try {
        const data = await sendPost(`urn:li:organization:${companyId}`);
        results.company.success = true;
        results.company.data = data;
      } catch (e: any) {
        results.company.error = e.message;
        console.error('Company post failed:', e.message);
      }
    }

    // Determine overall success
    const isSuccess = 
      (target === 'both' && (results.person.success || results.company.success)) ||
      (target === 'person' && results.person.success) ||
      (target === 'company' && results.company.success);

    return { 
      success: isSuccess, 
      data: results,
      message: isSuccess ? 'Published successfully to at least one target' : 'Failed to publish to requested targets'
    };
  } catch (error) {
    console.error('Failed to publish to LinkedIn:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
