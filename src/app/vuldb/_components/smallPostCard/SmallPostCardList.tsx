"use client";
import { PostDataType } from "@/types";
import { useEffect, useState } from "react";
import { formatRelativeTime } from "../../_utils/formatDate";
import { fetchNewPosts, incrementPostView } from "../../_utils/postDataManager"; // 최신순 게시글 가져오기
import SmallPostCardItem from "./SmallPostCardItem";

export default function SmallPostCardList({
  currentLabel,
  excludePostId,
}: {
  currentLabel: string;
  excludePostId: string;
}) {
  const [posts, setPosts] = useState<PostDataType[]>([]);

  const fetchPosts = async () => {
    const newPosts = await fetchNewPosts();
    setPosts(newPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const labeledPosts = posts.filter(
    (post) => post.label === currentLabel && post.id !== excludePostId,
  );

  let additionalPosts: PostDataType[] = [];
  if (labeledPosts.length < 6) {
    additionalPosts = posts
      .filter(
        (post) => post.label !== currentLabel && post.id !== excludePostId,
      )
      .slice(0, 6 - labeledPosts.length);
  }

  const finalPosts = [...labeledPosts, ...additionalPosts].slice(0, 6);

  const handlePostClick = async (post: PostDataType) => {
    await incrementPostView(post);
  };

  return (
    <div className="mx-auto mb-14 flex flex-wrap gap-8">
      {finalPosts.map((item) => {
        const uploadAtValue = item.upload_at || new Date().toISOString();
        const relativeDate = formatRelativeTime(uploadAtValue);
        return (
          <div key={item.id} onClick={() => handlePostClick(item)}>
            <SmallPostCardItem
              id={item.id}
              chips={item.chips}
              title={item.title}
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
