"use client";

import usePaginationStore from "@/store/usePaginationStore";
import { MockPostCardTypes } from "@/types";
import { useEffect, useState } from "react";
import { formatRelativeTime } from "../../_utils/formatDate";
import MainPostCardItem from "./MainPostCardItem";

export default function MainPostCardList({
  postData,
}: {
  postData: MockPostCardTypes[];
}) {
  const { currentPage, itemsPerPage } = usePaginationStore();
  const [visiblePosts, setVisiblePosts] = useState<MockPostCardTypes[]>([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVisiblePosts(postData.slice(startIndex, endIndex));
  }, [postData, currentPage, itemsPerPage]);

  return (
    <div className="flex flex-col gap-4">
      {visiblePosts.map((item) => {
        const relativeDate = formatRelativeTime(item.date);
        return (
          <MainPostCardItem
            key={item.id}
            id={item.id}
            chips={item.chips}
            title={item.title}
            company={item.company}
            reportContent={item.reportContent}
            date={relativeDate}
          />
        );
      })}
    </div>
  );
}
