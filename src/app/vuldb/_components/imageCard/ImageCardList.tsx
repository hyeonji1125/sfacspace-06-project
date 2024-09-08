"use client";
import { PostDataType } from "@/types";
import { useEffect, useState } from "react";
import { formatExactTime } from "../../_utils/formatDate";
import { fetchNewPosts } from "../../_utils/postDataManager";
import ImageCardItem from "./ImageCardItem";

export const getImageType = (
  index: number,
): "cardImage1" | "cardImage2" | "cardImage3" => {
  switch (index) {
    case 0:
      return "cardImage1";
    case 1:
      return "cardImage2";
    case 2:
      return "cardImage3";
    default:
      return "cardImage1";
  }
};

export default function ImageCardList() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [posts, setPosts] = useState<PostDataType[]>([]);
  const handleMouseEnter = (index: number) => setHoveredCard(index);
  const handleMouseLeave = () => setHoveredCard(null);

  const fetchAndSetPosts = async () => {
    const newPosts = await fetchNewPosts(); // 최신 게시글 가져오기
    setPosts(newPosts);
  };

  useEffect(() => {
    fetchAndSetPosts();
  }, []);

  const getWidthStyle = (index: number) => {
    if (hoveredCard === null) {
      return index === 0 ? "625px" : "316px";
    }
    return hoveredCard === index ? "625px" : "316px";
  };
  const sortedPosts = posts.slice(0, 3);

  return (
    <section className="flex w-full justify-between gap-7">
      {sortedPosts.map((post, index) => {
        const uploadAtValue = post.upload_at || new Date().toISOString();
        const exactDate = formatExactTime(uploadAtValue);
        const imageType = getImageType(index);
        const widthStyle = getWidthStyle(index);

        return (
          <ImageCardItem
            key={post.id}
            id={post.id}
            title={post.title}
            date={exactDate}
            image={imageType}
            widthStyle={widthStyle}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </section>
  );
}
