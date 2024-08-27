import { formatExactTime } from "../../_utils/formatDate";
import PostCardMock from "../_data/postCardMock";
import ImageCard from "./ImageCardItem";

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
      throw new Error();
  }
};

export default function ImageCardList() {
  const selectedCards = PostCardMock.filter((item) =>
    [1, 2, 3].includes(item.id),
  );
  return (
    <section className="flex w-full gap-7 px-3">
      {selectedCards.map((item) => {
        const exactDate = formatExactTime(item.date);
        const imageType = getImageType(item.id);

        return (
          <ImageCard
            key={item.id}
            id={item.id}
            title={item.title}
            date={exactDate}
            image={imageType}
          />
        );
      })}
    </section>
  );
}
