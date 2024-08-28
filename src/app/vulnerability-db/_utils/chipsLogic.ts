import { MockPostCardTypes } from "@/types";

export type ChipsType = "new" | "hot" | "default";

export const determineChips = (
  item: MockPostCardTypes,
  topFiveHotViews: number[],
  currentTime: number,
): ChipsType => {
  let chips: ChipsType = "default";

  const postTime = new Date(item.date).getTime();
  if (postTime >= currentTime - 48 * 60 * 60 * 1000) {
    chips = "new";
  }

  if (topFiveHotViews.includes(item.id) && chips !== "new") {
    chips = "hot";
  }

  return chips;
};

export const setPostChips = (postCardData: MockPostCardTypes[]) => {
  const currentTime = new Date().getTime();

  const sortedByViews = [...postCardData].sort(
    (a, b) => Number(b.views) - Number(a.views),
  );
  const topTenHotViews = sortedByViews.slice(0, 10).map((item) => item.id);

  return postCardData.map((item) => {
    const chips = determineChips(item, topTenHotViews, currentTime);
    return { ...item, chips };
  });
};
