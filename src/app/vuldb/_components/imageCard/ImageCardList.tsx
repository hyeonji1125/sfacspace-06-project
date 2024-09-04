"use client";
import { useState } from "react";
import { formatExactTime } from "../../_utils/formatDate";
import PostCardMock from "../_data/postCardMock";
import ImageCardItem from "./ImageCardItem";

export const getImageType = (
  id: number,
): "cardImage1" | "cardImage2" | "cardImage3" => {
  switch (id) {
    case 1:
      return "cardImage1";
    case 2:
      return "cardImage2";
    case 3:
      return "cardImage3";
    default:
      return "cardImage1";
  }
};

export default function ImageCardList() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => setHoveredCard(id);
  const handleMouseLeave = () => setHoveredCard(null);

  const getWidthStyle = (id: number) => {
    if (hoveredCard === null) {
      return id === 1 ? "625px" : "316px";
    }

    if (hoveredCard === 1) {
      return id === 1 ? "625px" : "316px";
    } else if (hoveredCard === 2) {
      return id === 2 ? "625px" : "316px";
    } else if (hoveredCard === 3) {
      return id === 3 ? "625px" : "316px";
    }

    return "316px";
  };

  return (
    <section className="flex w-full justify-between gap-7">
      {PostCardMock.filter((item) => [1, 2, 3].includes(item.id)).map(
        (item) => {
          const exactDate = formatExactTime(item.date);
          const imageType = getImageType(item.id);
          const widthStyle = getWidthStyle(item.id);

          return (
            <ImageCardItem
              key={item.id}
              id={item.id}
              title={item.title}
              date={exactDate}
              image={imageType}
              widthStyle={widthStyle}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            />
          );
        },
      )}
    </section>
  );
}
