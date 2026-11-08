const INDEXNOW_KEY = '8fa45d677a2846f4949a023b6b1580bc';
const HOST = 'ajprworld.com';
const KEY_LOCATION = `https://${HOST}/8fa45d677a2846f4949a023b6b1580bc.txt`;

/**
 * Automatically submits a URL or list of URLs to IndexNow (Bing/Yandex/Seznam)
 * to ensure instant crawling and search indexation.
 */
export async function submitToIndexNow(pathOrUrl: string | string[]) {
  const items = Array.isArray(pathOrUrl) ? pathOrUrl : [pathOrUrl];
  const urlList = items.map((item) => {
    if (item.startsWith('http://') || item.startsWith('https://')) {
      return item;
    }
    const cleanPath = item.startsWith('/') ? item : `/${item}`;
    return `https://${HOST}${cleanPath}`;
  });

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList,
      }),
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      console.log(`✅ Successfully submitted ${urlList.length} URL(s) to IndexNow:`, urlList);
      return { success: true, count: urlList.length };
    } else {
      console.warn(`⚠️ IndexNow submission returned HTTP ${res.status}: ${res.statusText}`);
      // Fallback single GET ping for primary URL
      if (urlList[0]) {
        const getUrl = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(urlList[0])}&key=${INDEXNOW_KEY}`;
        await fetch(getUrl, { method: 'GET' }).catch(() => {});
      }
      return { success: false, status: res.status };
    }
  } catch (error: any) {
    console.error(`❌ Error submitting URL(s) to IndexNow:`, error?.message || error);
    return { success: false, error: error?.message || 'Network error' };
  }
}
