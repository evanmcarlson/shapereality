import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const db = DynamoDBDocumentClient.from(client);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/go/")) return NextResponse.next();

  const slug = pathname.replace("/go/", "").toLowerCase();
  if (!slug) return NextResponse.next();

  try {
    const result = await db.send(
      new GetCommand({
        TableName: process.env.DYNAMO_TABLE,
        Key: { slug },
      }),
    );

    if (result.Item?.destination) {
      return NextResponse.redirect(result.Item.destination);
    }
  } catch (err) {
    console.error("go link lookup failed:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/go/:path*"],
};
