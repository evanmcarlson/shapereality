import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * Project-brief inquiries from the site's inquiry panel.
 *
 * Two independent, best-effort channels — success means at least one worked:
 *  - Notification email via Resend's REST API (RESEND_API_KEY; optional
 *    INQUIRY_TO / INQUIRY_FROM overrides). reply_to is the submitter, so
 *    replying to the notification answers the lead directly.
 *  - Durable copy in DynamoDB (INQUIRIES_TABLE, partition key `id` (S)),
 *    reusing the AWS credentials the /go/ redirect middleware already uses.
 *
 * With neither configured this returns 503 and the panel falls back to
 * showing the direct email address — no lead hits a dead end silently.
 */

const BUDGET_BANDS = new Set([
  "Not sure yet",
  "Under $5k",
  "$5–15k",
  "$15–25k",
  "$25k+",
]);

const field = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // honeypot filled → a bot; report success and drop it
  if (field(body.website, 100)) {
    return NextResponse.json({ success: true });
  }

  const name = field(body.name, 200);
  const email = field(body.email, 320);
  const idea = field(body.idea, 5000);
  const company = field(body.company, 200);
  const timeline = field(body.timeline, 200);
  const context = field(body.context, 200);
  const budgetRaw = field(body.budget, 40);
  const budget = BUDGET_BANDS.has(budgetRaw) ? budgetRaw : "";

  if (!name || !idea || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const inquiry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    email,
    idea,
    company,
    budget,
    timeline,
    context,
    userAgent: req.headers.get("user-agent") ?? "",
    referer: req.headers.get("referer") ?? "",
  };

  let stored = false;
  let notified = false;
  let configured = false;

  const table = process.env.INQUIRIES_TABLE;
  if (table && process.env.AWS_ACCESS_KEY_ID) {
    configured = true;
    try {
      const db = DynamoDBDocumentClient.from(
        new DynamoDBClient({
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
          },
        }),
      );
      await db.send(new PutCommand({ TableName: table, Item: inquiry }));
      stored = true;
    } catch (err) {
      console.error("inquiry: dynamo write failed:", err);
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    configured = true;
    const lines = [`Name: ${name}`, `Email: ${email}`];
    if (company) lines.push(`Company: ${company}`);
    if (budget) lines.push(`Budget: ${budget}`);
    if (timeline) lines.push(`Timeline: ${timeline}`);
    if (context) lines.push(`Context: ${context}`);
    lines.push(
      "",
      "The idea:",
      idea,
      "",
      `— ${inquiry.createdAt} · ${inquiry.referer || "direct"}`,
    );
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from:
            process.env.INQUIRY_FROM ?? "Shape Reality <onboarding@resend.dev>",
          to: [process.env.INQUIRY_TO ?? "evan@shapereality.com"],
          reply_to: email,
          subject: `Project brief — ${name}${context ? ` · ${context}` : ""}`,
          text: lines.join("\n"),
        }),
      });
      notified = res.ok;
      if (!res.ok) {
        console.error("inquiry: resend failed:", res.status, await res.text());
      }
    } catch (err) {
      console.error("inquiry: resend request failed:", err);
    }
  }

  if (!configured) {
    return NextResponse.json(
      { error: "Inquiry endpoint not configured" },
      { status: 503 },
    );
  }
  if (!stored && !notified) {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
  return NextResponse.json({ success: true });
}
