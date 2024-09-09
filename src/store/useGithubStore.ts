import { create } from "zustand";
import { RepositoryContent, RepositoryState } from "@/types";

export const useGithubStore = create<RepositoryState>(
  (set, get) => ({
    repositories: [],
    currentRepo: null,
    currentPath: "",
    repoContents: [],
    selectedFile: null,
    selectedFiles: [],
    isLoading: false,
    error: null,

    fetchRepositories: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch("/api/github/repositories");
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        set({ repositories: data, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    fetchRepoContents: async (
      owner: string,
      repo: string,
      path: string = "",
    ) => {
      set({ repoContents: [], isLoading: true, error: null });
      try {
        const response = await fetch(
          `/api/github/contents?owner=${owner}&repo=${repo}&path=${path}`,
        );
        if (!response.ok)
          throw new Error("Failed to fetch repository contents");
        const data = await response.json();
        set({
          currentRepo: `${owner}/${repo}`,
          currentPath: path,
          repoContents: data.map((item: RepositoryContent) => ({
            ...item,
            children: [],
            expanded: false,
          })),
          isLoading: false,
        });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    // 폴더 클릭 시 하위 디렉토리 내용을 불러와 추가하는 함수 (재귀적으로 하위 폴더 추가)
    fetchSubDirectoryContents: async (
      owner: string,
      repo: string,
      folderPath: string,
    ) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(
          `/api/github/contents?owner=${owner}&repo=${repo}&path=${folderPath}`,
        );
        if (!response.ok)
          throw new Error("Failed to fetch subdirectory contents");
        const data = await response.json();

        const addChildrenToNode = (
          nodes: RepositoryContent[],
          path: string,
          children: RepositoryContent[],
        ): RepositoryContent[] => {
          return nodes.map((node) => {
            if (node.path === path) {
              return {
                ...node,
                children,
                expanded: !node.expanded,
              };
            } else if (node.children && node.children.length > 0) {
              return {
                ...node,
                children: addChildrenToNode(node.children, path, children),
              };
            }
            return node;
          });
        };

        set((state) => {
          const updatedRepoContents = addChildrenToNode(
            state.repoContents,
            folderPath,
            data,
          );
          return { repoContents: updatedRepoContents, isLoading: false };
        });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    selectFile: async (owner: string, repo: string, path: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(
          `/api/github/file?owner=${owner}&repo=${repo}&path=${path}`,
        );
        if (!response.ok) throw new Error("Failed to fetch file content");
        const data = await response.json();

        const decodedContent = decodeURIComponent(escape(atob(data.content)));

        set({
          selectedFile: { ...data, content: decodedContent },
          isLoading: false,
        });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    toggleSelectFile: (filePath: string) => {
      set((state) => {
        const selectedFiles = state.selectedFiles.includes(filePath)
          ? state.selectedFiles.filter((path) => path !== filePath)
          : [...state.selectedFiles, filePath];
        return { selectedFiles };
      });
    },

    clearSelectedFiles: () => {
      set({ selectedFiles: [] });
    },

    clearSelection: () => {
      set({ selectedFile: null });
    },
  )
);
