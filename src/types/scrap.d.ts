type ArticleType = "취약성 경고" | "취약성 알림" | "취약성 보고서" | "기타";

export type Article = {
  label: ArticleType;
  name: string;
  c_id: number;
  created_at: string;
  id: string;
};

export type ScrapState = {
  isLoading: boolean;
  error: string | null;
  scraps: Article[];
  ITEMS_PER_PAGE: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchScraps: (email: string) => void;
};
