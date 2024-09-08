import { RepositoryProps } from "@/types";
import { sortItems } from "../utils/sortItems";
import { useEffect } from "react";
import { TDropdownSelect } from "../app/repos/_components/LibraryToolbar";
import { TClippingArticle } from "@/app/me/(me-layout)/scraps/_components/ClippingArticle";
import { useLibraryStore } from "@/store/useLibraryStore";
import { findMatchData } from "@/app/repos/_utils/findMatchData";

export const useFilterReposType = (
  selectedItem: TDropdownSelect,
  setRepos: React.Dispatch<React.SetStateAction<RepositoryProps[]>>,
  repositories: RepositoryProps[],
) => {
  const { libraryState, reposData } = useLibraryStore();

  const FILTER_TYPE = {
    repoInteraction: {
      bookmark: (repo: RepositoryProps) =>
        findMatchData(repo, reposData)?.bookmark,
      recent: (repo: RepositoryProps) => findMatchData(repo, reposData)?.recent,
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

  useEffect(() => {
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
    sortItems(selectedItem.sort, setRepos);
  }, [
    repositories,
    selectedItem.type,
    selectedItem.sort,
    libraryState.bookmark,
    libraryState.recent,
    setRepos,
  ]);
};

export const useFilterArticles = (
  selectedItem: TDropdownSelect,
  setArticles: React.Dispatch<React.SetStateAction<TClippingArticle[]>>,
  articles: TClippingArticle[],
) => {
  useEffect(() => {
    if (selectedItem.type === "취약성 알림") {
      setArticles(() => articles.filter((article) => article.type === "gray"));
    } else if (selectedItem.type === "취약성 경고") {
      setArticles(() =>
        articles.filter((article) => article.type === "warning"),
      );
    } else if (selectedItem.type === "취약성 보고서") {
      setArticles(() =>
        articles.filter((article) => article.type === "notification"),
      );
    } else {
      setArticles(articles);
    }
    sortItems(selectedItem.sort, setArticles);
  }, [articles, selectedItem.type, selectedItem.sort, setArticles]);
};
