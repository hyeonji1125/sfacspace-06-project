import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  const path = searchParams.get('path');
  const per_page = searchParams.get('per_page');

  if (!owner || !repo || !path) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const response = await octokit.repos.listCommits({
      owner,
      repo,
      path,
      per_page: per_page ? Number(per_page) : 1,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching commits:', error);
    return NextResponse.json({ error: 'Failed to fetch commits' }, { status: 500 });
  }
}