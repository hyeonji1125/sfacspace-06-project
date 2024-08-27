export type PaginationState = {
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
};
