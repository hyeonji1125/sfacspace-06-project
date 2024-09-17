import { RepositoryContent } from "@/types";

// 파일 정렬 함수
export const sortFiles = (
  files: RepositoryContent[],
  sortList: "파일순" | "폴더순" | "북마크순",
) => {
  let sorted = [...files];
  switch (sortList) {
    case "폴더순":
      sorted = sorted.sort((a, b) => {
        if (a.type === "dir" && b.type !== "dir") return -1;
        if (a.type !== "dir" && b.type === "dir") return 1;
        return 0;
      });
      break;
    case "파일순":
      sorted = sorted.sort((a, b) => {
        if (a.type === "file" && b.type !== "file") return -1;
        if (a.type !== "file" && b.type === "file") return 1;
        return 0;
      });
      break;
    case "북마크순":
      sorted = sorted.sort((a, b) => {
        if (a.isBookmarked && !b.isBookmarked) return -1;
        if (!a.isBookmarked && b.isBookmarked) return 1;
        return 0;
      });
      break;
    default:
      break;
  }
  return sorted;
};
