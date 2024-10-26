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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null); // Hover 상태 관리
  const [posts, setPosts] = useState<PostDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseEnter = (index: number) => setHoveredCard(index);
  const handleMouseLeave = () => setHoveredCard(null);

  const fetchAndSetPosts = async () => {
    setIsLoading(true);
    const newPosts = await fetchNewPosts(); // 최신 게시글 가져오기
    setPosts(newPosts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAndSetPosts();
  }, []);

  const getFlexGrow = (index: number) => {
    if (hoveredCard === null) {
      return index === 0 ? 2 : 1;
    }

    return hoveredCard === index ? 2 : 1;
  };

  const sortedPosts = posts.slice(0, 3); // 첫 3개의 게시글만 표시

  const SkeletonImageCard = () => {
    return (
      <div className="h-[390px] flex-grow animate-pulse rounded-[20px] bg-gray-200 dark:bg-gray-600"></div>
    );
  };

  return (
    <section className="flex w-full max-w-[1313px] justify-between gap-4">
      {isLoading
        ? Array(3)
            .fill(0)
            .map((_, index) => <SkeletonImageCard key={index} />)
        : sortedPosts.map((post, index) => {
            const uploadAtValue = post.upload_at || new Date().toISOString();
            const exactDate = formatExactTime(uploadAtValue);
            const imageType = getImageType(index);
            const flexGrow = getFlexGrow(index);

            return (
              <div
                key={post.id}
                className="w-full max-w-[650px] flex-grow"
                style={{ flexGrow, transition: "flex-grow 0.3s ease-out" }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <ImageCardItem
                  id={post.id}
                  title={post.title}
                  date={exactDate}
                  image={imageType}
                  flexGrow={flexGrow} // flexGrow 값을 prop으로 넘김
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            );
          })}
    </section>
  );
}
