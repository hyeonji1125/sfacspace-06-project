export type RepositoryProps = {
  id: number;
  name: string;
  // html_url: string;
  owner: {
    login: string;
  };
  visibility: "public" | "private";
  description: string | null;
  /* 추후 필요한 필드 추가 */
};

export type RepositoryContent = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir" | "symlink" | "submodule";
  content?: string;
  encoding?: string;
};

export type FileContent = RepositoryContent & {
  content: string;
};

export type RepositoryState = {
  repositories: RepositoryProps[];
  currentRepo: string | null;
  currentPath: string;
  repoContents: RepositoryContent[];
  selectedFile: FileContent | null;
  selectedFiles: string[];
  isLoading: boolean;
  error: string | null;

  fetchRepositories: () => Promise<void>;
  fetchRepoContents: (
    owner: string,
    repo: string,
    path?: string,
  ) => Promise<void>;
  selectFile: (owner: string, repo: string, path: string) => Promise<void>;
  toggleSelectFile: (filePath: string) => void;
  clearSelection: () => void;
  clearSelectedFiles: () => void;
};

export type TAnalyzeModalProp = {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  isWhole: boolean;
  title: string;
  fileList: RepositoryContent[];
};
