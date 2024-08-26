'use client'

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useGithubStore } from '@/store/useGithubStore';
import { RepositoryProps, RepositoryContent } from '@/types';

export default function RepoList() {
  const { data: session } = useSession();
  const { 
    repositories, 
    currentRepo,
    currentPath,
    repoContents, 
    selectedFile,
    isLoading, 
    error, 
    fetchRepositories, 
    fetchRepoContents,
    selectFile,
    clearSelection
  } = useGithubStore();

  useEffect(() => {
    if (session) {
      fetchRepositories();
    }
  }, [session, fetchRepositories]);

  const handleRepoClick = (repo: RepositoryProps) => {
    fetchRepoContents(repo.owner.login, repo.name);
  };

  const handleContentClick = (content: RepositoryContent) => {
    const [owner, repo] = currentRepo!.split('/');
    if (content.type === 'dir') {
      fetchRepoContents(owner, repo, content.path);
    } else {
      selectFile(owner, repo, content.path);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      {!currentRepo ? (
        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>
              <button onClick={() => handleRepoClick(repo)}>
                {repo.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h3>{currentRepo}{currentPath && `: ${currentPath}`}</h3>
          <button onClick={() => {
            const [owner, repo] = currentRepo.split('/');
            fetchRepoContents(owner, repo, '');
          }}>
            Root
          </button>
          <ul>
            {repoContents.map((content) => (
              <li key={content.sha}>
                <button onClick={() => handleContentClick(content)}>
                  {content.type === 'file' ? '📄' : '📁'} {content.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedFile && (
        <div>
          <h4>File: {selectedFile.path}</h4>
          <pre>{selectedFile.content || 'Loading...'}</pre>
          <button onClick={clearSelection}>Close File</button>
        </div>
      )}
    </div>
  );
}