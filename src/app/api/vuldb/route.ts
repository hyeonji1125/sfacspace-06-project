import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(
    req.url,
    `http://${req.headers.get("host")}`,
  );
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  const data = {
    query,
    message: `Search results for: ${query}`,
  };

  return NextResponse.json(data);
}
