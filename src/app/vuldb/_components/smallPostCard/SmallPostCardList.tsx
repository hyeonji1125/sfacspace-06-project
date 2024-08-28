"use client";
import { setPostChips } from "../../_utils/chipsLogic";
import { formatRelativeTime } from "../../_utils/formatDate";
import PostCardMock from "../_data/postCardMock";
import SmallPostCardItem from "./SmallPostCardItem";

export default function SmallPostCardList() {
  const smallPostCards = PostCardMock.slice(0, 6);

  const smallDataChips = setPostChips(smallPostCards);

  return (
    <div className="flex flex-wrap gap-4">
      {smallDataChips.map((item) => {
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
