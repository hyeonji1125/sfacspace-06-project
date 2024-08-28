import usePaginationStore from "@/store/usePaginationStore";
import {
  PageLeft,
  PageRight,
} from "../../../../public/assets/svg/vulnerabilityDbSvg";

export default function Pagination({ totalItems }: { totalItems: number }) {
  const { currentPage, setCurrentPage, itemsPerPage } = usePaginationStore();

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageButtons = 10;
  const currentGroup = Math.floor((currentPage - 1) / maxPageButtons);

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
          onClick={() => setCurrentPage(startPage - 1)}
        >
          <PageLeft />
        </button>
      )}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`h-9 w-9 px-2 hover:bg-bg-purple-light ${page === currentPage ? "bg-bg-purple-light font-bold" : ""}`}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <button
          className="hover:bg-bg-purple-light"
          onClick={() => setCurrentPage(endPage + 1)}
        >
          <PageRight />
        </button>
      )}
    </div>
  );
}
