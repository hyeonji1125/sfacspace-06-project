"use client";

import { PostDataType } from "@/types";
import { formatRelativeTime } from "../../_utils/formatDate";
import { incrementPostView } from "../../_utils/postDataManager";
import MainPostCardItem from "./MainPostCardItem";
import SkeletonPostCard from "./SkeletonPostCard";

export default function MainPostCardList({
  postData,
}: {
  postData: PostDataType[];
}) {
  const handlePostClick = async (post: PostDataType) => {
    await incrementPostView(post);
  };

  const isLoading = postData.length === 0;

  return (
    <div className="flex flex-col gap-4">
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, index) => <SkeletonPostCard key={index} />)
        : postData.map((item) => {
            const uploadAtValue = item.upload_at || new Date().toISOString();
            const relativeDate = formatRelativeTime(uploadAtValue);
            return (
              <div key={item.id} onClick={() => handlePostClick(item)}>
                <MainPostCardItem
                  id={item.id}
                  chips={item.chips}
                  title={item.title}
                  site_name={item.site_name}
                  report_content={item.report_content}
                  upload_at={relativeDate}
                  views={item.views}
                />
              </div>
            );
          })}
    </div>
  );
}
