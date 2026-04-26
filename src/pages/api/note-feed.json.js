export async function GET() {
  const RSS_URL = "https://note.com/kizuna_works/rss";
  const API_KEY = "ov8zqmcpon2nfe5tptbfyvolvr71cgkudmabt2ja";
  const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&api_key=${API_KEY}&count=12`;

  try {
    const response = await fetch(endpoint, {
      headers: { Referer: "https://kizuna-works.jp/" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ status: "error", items: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
