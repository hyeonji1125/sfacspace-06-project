"use client";
import { setPostChips } from "../../_utils/chipsLogic";
import { formatRelativeTime } from "../../_utils/formatDate";
import PostCardMock from "../_data/postCardMock";
import SmallPostCardItem from "./SmallPostCardItem";

export default function SmallPostCardList() {
  const smallDataChips = setPostChips(PostCardMock);
  const smallPostCards = smallDataChips.slice(0, 6);

  return (
    <div className="mx-auto flex flex-wrap gap-8">
      {smallPostCards.map((item) => {
        const relativeDate = formatRelativeTime(item.date);
        return (
          <SmallPostCardItem
            key={item.id}
            id={item.id}
            chips={item.chips}
            title={item.title}
            reportContent={item.reportContent}
            date={relativeDate}
          />
        );
      })}
    </div>
  );
}
