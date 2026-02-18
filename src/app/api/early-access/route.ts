import { NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
  institution?: string;
  role?: string;
  referral?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    if (!body?.name || !body?.email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Option A (recommended): store in Supabase using a service role key.
    // Set:
    // - SUPABASE_URL
    // - SUPABASE_SERVICE_ROLE_KEY
    // - PREREG_TABLE (optional, defaults to "preregistrations")
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const table = process.env.PREREG_TABLE || "preregistrations";

    if (url && key) {
      const res = await fetch(`${url}/rest/v1/${table}`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify([
          {
            name: body.name,
            email: body.email,
            institution: body.institution || null,
            role: body.role || null,
            referral: body.referral || null,
            utm_source: body.utm_source || null,
            utm_medium: body.utm_medium || null,
            utm_campaign: body.utm_campaign || null,
            created_at: new Date().toISOString(),
          },
        ]),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        return NextResponse.json(
          { error: "Failed to save submission.", detail: txt.slice(0, 400) },
          { status: 500 }
        );
      }

      return NextResponse.json({ ok: true });
    }

    // Option B: no backend configured yet — return ok so you can ship UI/analytics first.
    // (You can switch this to "return 500" if you prefer hard-fail.)
    console.warn("[early-access] No SUPABASE env configured; received:", body.email);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Unexpected error." },
      { status: 500 }
    );
  }
}
