import { RepositoryProps } from "@/types";
import { RepoItem } from "@/types/library";
import { findMatchData } from "./findMatchData";

export const filterRepos = (
  type: "recent" | "bookmark",
  setRepos: React.Dispatch<React.SetStateAction<RepositoryProps[]>>,
  repositories: RepositoryProps[],
  reposData: RepoItem[],
) => {
  const filteredRepositories = repositories.filter((repo) => {
    const matchData = findMatchData(repo, reposData);
    if (matchData && matchData[type]) return repo;
  });
  setRepos(() => filteredRepositories);
};
