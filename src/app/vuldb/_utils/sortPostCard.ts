import { MockPostCardTypes } from "@/types";

export const sortPostCards = (
  postCardMock: MockPostCardTypes[],
  sortBy: "views" | "date",
): MockPostCardTypes[] => {
  const postCardData = [...postCardMock]; // 복사본 생성

  if (sortBy === "views") {
    postCardData.sort((a, b) => Number(b.views) - Number(a.views));
  } else if (sortBy === "date") {
    postCardData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  return postCardData;
};
