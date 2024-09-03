export type PaginationState = {
  currentPage: number;
  itemsPerPage: number;
  reposItemsPerPage: number;
  scrapsItemsPerPage: number;
  setCurrentPage: (page: number) => void;
};
