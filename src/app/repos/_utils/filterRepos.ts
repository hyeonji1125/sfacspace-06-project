import { RepositoryProps } from "@/types";

export const filterRepos = (
  name: "recent" | "bookmark",
  setRepos: React.Dispatch<React.SetStateAction<RepositoryProps[]>>,
  repositories: RepositoryProps[],
) => {
  setRepos(() => repositories.filter((repo) => repo[name]));
};
