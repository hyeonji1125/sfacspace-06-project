import { RepositoryStatus } from ".";

export type RepoItem = {
  recent?: boolean;
  bookmark?: boolean;
  id: string;
  status?: RepositoryStatus;
};

export type FilterType = {
  recent: boolean;
  bookmark: boolean;
};

export type LibraryState = {
  status: {
    isLoading: boolean;
    error: string | null;
  };
  libraryState: FilterType;
  reposData: repoItem[];
  setLibraryState: ({ recent: boolean, bookmark: boolean }) => void;
  fetchReposData: (email: string) => void;
  setReposData: (data: reposData) => void;
};
