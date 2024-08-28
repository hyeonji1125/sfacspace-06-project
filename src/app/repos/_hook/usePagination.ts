import { useState } from "react";

const ITEMS_PER_PAGE = 12;

type TPaginationMode = "default" | "more";

export const usePagination = <T>(
  data: T[],
  mode: TPaginationMode = "default",
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCount, setCurrentCount] = useState(ITEMS_PER_PAGE);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = mode === "more" ? currentCount : startIndex + ITEMS_PER_PAGE;
  const currentItems = data.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleMore = () => {
    if (currentCount < data.length) {
      setCurrentCount((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    handlePrev,
    handleNext,
    handleMore,
    hasMore: currentCount < data.length,
  };
};
