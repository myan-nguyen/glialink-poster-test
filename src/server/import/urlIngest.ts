import * as cheerio from "cheerio";

const MAX_CONTENT_SIZE = 8_000; // Limit to 8000 chars as per example strategy

/**
 * Fetch and extract text content from website using cheerio for efficient HTML parsing
 * Mirrors the example implementation for consistency and memory efficiency
 */
export async function fetchUrlText(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; GliaLink/1.0; +https://glialink.com)",
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove scripts, styles, and navigation elements - much cleaner than regex
    $("script, style, nav, header, footer, iframe, noscript").remove();

    // Extract main content from body
    const text = $("body")
      .text()
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim();

    // Limit to MAX_CONTENT_SIZE chars to stay within token limits and prevent memory issues
    return text.slice(0, MAX_CONTENT_SIZE);
  } catch (error: any) {
    console.error(`Website fetch failed for ${url}:`, error.message);
    return "";
  }
}
