const INDEXNOW_KEY = 'ajprworldindexnowkey2024';
const HOST = 'ajprworld.com';

/**
 * Automatically submits a URL to IndexNow (Bing/Yandex) to ensure instant indexing
 * and prevent SEO audit tools from flagging missing IndexNow submissions.
 */
export async function submitToIndexNow(path: string) {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `https://${HOST}${cleanPath}`;
  
  const endpoint = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`;
  
  try {
    const res = await fetch(endpoint, { method: 'GET' });
    if (res.ok) {
      console.log(`✅ Automatically submitted ${url} to IndexNow`);
    } else {
      console.warn(`⚠️ Failed to submit ${url} to IndexNow: ${res.statusText}`);
    }
  } catch (error) {
    console.error(`❌ Error submitting ${url} to IndexNow:`, error);
  }
}
