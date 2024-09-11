import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getFileContent } from "@/lib/api/github";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const path = searchParams.get("path") || "";
  const encodedPath = path
    .split("/")
    .map(encodeURIComponent)
    .join("/")
    .replace(/\/$/, "");

  if (!owner || !repo || !path) {
    return NextResponse.json(
      { error: "Missing owner, repo, or path" },
      { status: 400 },
    );
  }

  try {
    const data = await getFileContent(
      session.accessToken,
      owner,
      repo,
      encodedPath,
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching:", error);
    return NextResponse.json(
      { error: "Failed to fetch file content" },
      { status: 500 },
    );
  }
}
