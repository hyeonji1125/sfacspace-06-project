import usePaginationStore from "@/store/usePaginationStore";
import {
  PageLeft,
  PageRight,
} from "../../../../public/assets/svg/vulnerabilityDbSvg";
import { SetStateAction } from "react";

export default function Pagination({
  totalItems,
  type = "VULDB",
  current,
  setCurrent = () => {},
  numberPerPage = 16,
}: {
  totalItems: number;
  type?: "VULDB" | "REPOS" | "SCRAPS";
  current?: number;
  setCurrent?: React.Dispatch<SetStateAction<number>>;
  numberPerPage?: number;
}) {
  const { currentPage, setCurrentPage, itemsPerPage } = usePaginationStore();

  const totalPages = Math.ceil(
    totalItems / (type === "VULDB" ? itemsPerPage : numberPerPage),
  );
  const maxPageButtons = 10;
  const currentGroup = Math.floor(
    ((current ? current : currentPage) - 1) / maxPageButtons,
  );

  const startPage = currentGroup * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mb-2 flex items-center justify-center text-base font-normal text-[#3f3f3f]">
      {startPage > 1 && (
        <button
          className="hover:bg-bg-purple-light"
          onClick={() =>
            type === "VULDB"
              ? setCurrentPage(startPage - 1)
              : setCurrent(startPage - 1)
          }
        >
          <PageLeft />
        </button>
      )}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() =>
            type === "VULDB" ? setCurrentPage(page) : setCurrent(page)
          }
          className={`h-9 w-9 px-2 hover:bg-bg-purple-light ${(type === "VULDB" ? page === currentPage : page === current) ? "bg-bg-purple-light font-bold" : ""}`}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <button
          className="hover:bg-bg-purple-light"
          onClick={() =>
            type === "VULDB"
              ? setCurrentPage(endPage - 1)
              : setCurrent(endPage - 1)
          }
        >
          <PageRight />
        </button>
      )}
    </div>
  );
}
