'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGithubStore } from '@/store/useGithubStore';
import FileList from './_components/FileList';

export default function RepositoryPage() {
  const params = useParams();
  const owner = Array.isArray(params.owner) ? params.owner[0] : params.owner;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  const { fetchRepoContents, repoContents, isLoading, error } = useGithubStore();

  useEffect(() => {
    if (owner && name) {
      fetchRepoContents(owner, name);
    }
  }, [owner, name, fetchRepoContents]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Repository: {owner}/{name}</h1>
      <FileList contents={repoContents} />
    </div>
  );
}
