"use client";

import LibraryToolbar, {
  TDropdownSelect,
} from "@/app/repos/_components/LibraryToolbar";
import Pagination from "@/app/vuldb/_components/Pagination";
import { useEffect, useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";
import { useFilterArticles } from "@/hooks/useFilterItems";
import { sortItems } from "@/utils/sortItems";
import ArticleList from "./ArticleList";
import { useScrapStore } from "@/store/useScrapStore";
import { Article } from "@/types/scrap";

export default function ArticleLibrary() {
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [currentArticles, setCurrentArticles] = useState<Article[]>([]);
  const [selectedItem, setSelectedItem] = useState<TDropdownSelect>({
    type: "Type",
    sort: "Sort",
  });
  const { scraps, fetchScraps, ITEMS_PER_PAGE, currentPage, setCurrentPage } =
    useScrapStore();
  const { email } = useGetUser();
  const typeOptions = [
    "전체",
    "취약성 경고",
    "취약성 알림",
    "취약성 보고서",
    "기타",
  ];

  useFilterArticles(selectedItem, setFilteredArticles, scraps);

  useEffect(() => {
    if (email) {
      fetchScraps(email);
    }
  }, [email, fetchScraps]);

  useEffect(() => {
    sortItems(selectedItem.sort, setFilteredArticles);
  }, [selectedItem.sort, setFilteredArticles]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentArticles(filteredArticles.slice(startIndex, endIndex));
  }, [filteredArticles, currentPage, ITEMS_PER_PAGE]);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-[124px]">
      <div className="flex w-full flex-col gap-12">
        <LibraryToolbar
          selectedItem={selectedItem}
          onSelect={setSelectedItem}
          options={typeOptions}
        />
        <div className="h-auto w-full">
          <ArticleList currentArticles={currentArticles} />
        </div>
        <Pagination
          totalItems={filteredArticles.length}
          current={currentPage}
          setCurrent={setCurrentPage}
          numberPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </section>
  );
}
