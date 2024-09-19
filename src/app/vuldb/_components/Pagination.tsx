import {
  PageLeft,
  PageRight,
} from "../../../../public/assets/svg/vulnerabilityDbSvg";

export default function Pagination({
  totalItems,
  current,
  setCurrent = () => {},
  numberPerPage = 16,
}: {
  totalItems: number;
  current?: number;
  setCurrent?: (page: number) => void;
  numberPerPage?: number;
}) {
  const totalPages = Math.ceil(totalItems / numberPerPage);
  const maxPageButtons = 10;
  const currentGroup = Math.floor((current! - 1) / maxPageButtons);

  const startPage = currentGroup * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mb-2 flex items-center justify-center text-base font-normal text-text-gray-default">
      {startPage > 1 && (
        <button
          className="hover:bg-bg-purple-light"
          onClick={() => setCurrent(startPage - 1)}
        >
          <PageLeft />
        </button>
      )}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => setCurrent(page)}
          className={`rounded-1 h-9 w-9 px-2 hover:bg-bg-purple-light hover:dark:bg-grayscale-80 ${page === current ? "font-bold text-primary-purple-500 dark:text-custom-dark-text" : ""}`}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <button
          className="hover:bg-bg-purple-light"
          onClick={() => setCurrent(endPage + 1)}
        >
          <PageRight />
        </button>
      )}
    </div>
  );
}
