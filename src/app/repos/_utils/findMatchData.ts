import { RepositoryProps } from "@/types";
import { RepoItem } from "@/types/library";

export const findMatchData = (repo: RepositoryProps, reposData: RepoItem[]) => {
  const matchData = reposData.find((repoData) => repoData.id === repo.name);

  return matchData;
};
