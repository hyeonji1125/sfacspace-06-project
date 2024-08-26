import { create } from "zustand";
import { RepositoryState } from "@/types";


export const useGithubStore = create<RepositoryState>((set, get) => ({
  repositories: [],
  currentRepo: null,
  currentPath: '',
  repoContents: [],
  selectedFile: null,
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

  fetchRepoContents: async (owner: string, repo: string, path: string = '') => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/github/contents?owner=${owner}&repo=${repo}&path=${path}`);
      if (!response.ok) throw new Error("Failed to fetch repository contents");
      const data = await response.json();
      set({ 
        currentRepo: `${owner}/${repo}`,
        currentPath: path,
        repoContents: data, 
        isLoading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  selectFile: async (owner: string, repo: string, path: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/github/file?owner=${owner}&repo=${repo}&path=${path}`);
      if (!response.ok) throw new Error("Failed to fetch file content");
      const data = await response.json();
      set({ 
        selectedFile: { ...data, content: atob(data.content) },
        isLoading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  clearSelection: () => {
    set({ selectedFile: null });
  }
}));