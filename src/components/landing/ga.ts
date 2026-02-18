export type UTM = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: any[]) => void;
  }
}

const KEY = "glialink_utm_v1";

export function readUTM(): UTM {
  if (typeof window === "undefined") {
    return { utm_source: "", utm_medium: "", utm_campaign: "" };
  }

  // 1) Read from URL (fresh)
  const params = new URLSearchParams(window.location.search);
  const fresh: UTM = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
  };

  // 2) Persist in sessionStorage (spec requirement)
  const hasAnyFresh = Boolean(fresh.utm_source || fresh.utm_medium || fresh.utm_campaign);
  if (hasAnyFresh) {
    sessionStorage.setItem(KEY, JSON.stringify(fresh));
    return fresh;
  }

  // 3) Fallback to sessionStorage
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return fresh;
    const parsed = JSON.parse(raw);
    return {
      utm_source: parsed.utm_source || "",
      utm_medium: parsed.utm_medium || "",
      utm_campaign: parsed.utm_campaign || "",
    };
  } catch {
    return fresh;
  }
}

export function track(event: string, extra?: Record<string, any>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  const utm = readUTM();
  window.gtag("event", event, {
    event_category: "signup",
    ...utm,
    ...(extra || {}),
  });
}
