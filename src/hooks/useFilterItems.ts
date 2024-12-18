import { RepositoryProps } from "@/types";
import { sortItems } from "../utils/sortItems";
import { useEffect } from "react";
import { TDropdownSelect } from "../app/repos/_components/LibraryToolbar";
import { useLibraryStore } from "@/store/useLibraryStore";
import { findMatchData } from "@/app/repos/_utils/findMatchData";
import { useScrapStore } from "@/store/useScrapStore";
import { Article } from "@/types/scrap";

export const useFilterReposType = (
  selectedItem: TDropdownSelect,
  setRepos: React.Dispatch<React.SetStateAction<RepositoryProps[]>>,
  repositories: RepositoryProps[],
) => {
  const { libraryState, reposData, setCurrentPage } = useLibraryStore();

  useEffect(() => {
    const FILTER_TYPE = {
      repoInteraction: {
        bookmark: (repo: RepositoryProps) =>
          findMatchData(repo, reposData)?.bookmark,
        recent: (repo: RepositoryProps) =>
          findMatchData(repo, reposData)?.recent,
      },
      repoType: {
        검사완료: (repo: RepositoryProps) =>
          findMatchData(repo, reposData)?.status === "COMPLETED",
        검사중: (repo: RepositoryProps) =>
          findMatchData(repo, reposData)?.status === "IN_PROGRESS",
      },
    };

    type repoInteractionKeys = keyof typeof FILTER_TYPE.repoInteraction;
    type repoTypeKeys = keyof typeof FILTER_TYPE.repoType;
    type libraryStateKeys = keyof typeof libraryState;

    let filteredRepos = repositories;

    Object.keys(FILTER_TYPE.repoInteraction).forEach((key) => {
      if (libraryState[key as libraryStateKeys]) {
        filteredRepos = filteredRepos.filter(
          FILTER_TYPE.repoInteraction[key as repoInteractionKeys],
        );
      }
    });

    if (selectedItem.type in FILTER_TYPE.repoType) {
      filteredRepos = filteredRepos.filter(
        FILTER_TYPE.repoType[selectedItem.type as repoTypeKeys],
      );
    }

    setRepos(filteredRepos);
    setCurrentPage(1);
    sortItems(selectedItem.sort, setRepos);
  }, [
    repositories,
    selectedItem.type,
    selectedItem.sort,
    libraryState.bookmark,
    libraryState.recent,
    setRepos,
    reposData,
    libraryState,
    setCurrentPage,
  ]);
};

export const useFilterArticles = (
  selectedItem: TDropdownSelect,
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>,
  articles: Article[],
) => {
  const { setCurrentPage } = useScrapStore();

  useEffect(() => {
    if (selectedItem.type === "전체" || selectedItem.type === "Type") {
      setArticles(articles);
    } else {
      setArticles(() =>
        articles.filter((article) => article.label === selectedItem.type),
      );
    }

    setCurrentPage(1);
    sortItems(selectedItem.sort, setArticles);
  }, [
    articles,
    selectedItem.sort,
    selectedItem.type,
    setArticles,
    setCurrentPage,
  ]);
};
