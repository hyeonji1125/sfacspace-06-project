import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getRepositories } from '@/lib/api/github';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const repositories = await getRepositories(session.accessToken);
    return NextResponse.json(repositories);
  } catch (error) {
    console.error('Error fetching:', error);
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 });
  }
}