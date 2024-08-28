"use client";

import { MockPostCardTypes } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SmallPostCardList from "../../_components/smallPostCard/SmallPostCardList";
import PostCardMock from "../../_components/_data/postCardMock";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<MockPostCardTypes | null>(null);

  useEffect(() => {
    if (id) {
      const postData = PostCardMock.find((post) => post.id === Number(id));
      setPost(postData || null);
    }
  }, [id]);

  if (!post) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        <h1>{post.title}</h1>
        <p>{post.company}</p>
        <p>{post.reportContent}</p>
        <p>{post.date.toString()}</p>
        <p>{post.views} views</p>
        <p>{post.label}</p>
      </div>
      <SmallPostCardList />
    </div>
  );
}
