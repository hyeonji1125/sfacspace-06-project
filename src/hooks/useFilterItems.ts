import { RepositoryProps } from "@/types";
import { sortItems } from "../utils/sortItems";
import { useEffect } from "react";
import { TDropdownSelect } from "../app/repos/_components/LibraryToolbar";
import { TClippingArticle } from "@/app/me/(me-layout)/scraps/_components/ClippingArticle";
import { useLibraryStore } from "@/store/useLibraryStore";

export const useFilterRepos = (
  selectedItem: TDropdownSelect,
  setRepos: React.Dispatch<React.SetStateAction<RepositoryProps[]>>,
  repositories: RepositoryProps[],
) => {
  const { libraryState } = useLibraryStore();

  useEffect(() => {
    let filteredRepos = repositories;

    if (libraryState.bookmark) {
      filteredRepos = repositories.filter((repo) => repo.bookmark);
    } else if (libraryState.recent) {
      filteredRepos = repositories.filter((repo) => repo.recent);
    }

    if (selectedItem.type === "검사완료") {
      filteredRepos = filteredRepos.filter(
        (repo) => repo.status === "COMPLETED",
      );
    } else if (selectedItem.type === "검사중") {
      filteredRepos = filteredRepos.filter(
        (repo) => repo.status === "IN_PROGRESS",
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
