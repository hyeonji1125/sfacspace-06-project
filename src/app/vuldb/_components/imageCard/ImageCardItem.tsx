import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ArrowRight } from "../../../../../public/assets/svg/vulnerabilityDbSvg";

type ImageCardProps = {
  id: number;
  title: string;
  date: string;
  image: "cardImage1" | "cardImage2" | "cardImage3";
  widthStyle: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function ImageCardItem({
  id,
  title,
  date,
  image,
  widthStyle,
  onMouseEnter,
  onMouseLeave,
}: ImageCardProps) {
  const imageSrc = {
    cardImage1: "bg-[url('/assets/images/vuldb/items/CardImg1.png')]",
    cardImage2: "bg-[url('/assets/images/vuldb/items/CardImg2.png')]",
    cardImage3: "bg-[url('/assets/images/vuldb/items/CardImg3.png')]",
  };

  const isWide = widthStyle === "625px";

  const titleClass = isWide ? "text-[28px] w-[420px]" : "text-lg w-[136px]";
  const dateClass = isWide ? "text-xl w-[420px]" : "text-xs w-[136px]";

  return (
    <Link href={`/vuldb/items/${id}`}>
      <div
        className={twMerge(
          "flex h-[390px] rounded-[20px] bg-cover bg-center duration-300",
          imageSrc[image],
        )}
        style={{ width: widthStyle }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex w-full items-end justify-between px-9 py-9">
          <div className="flex flex-col gap-2">
            <h1 className={twMerge("font-semibold text-white", titleClass)}>
              {title}
            </h1>
            <p className={twMerge("font-medium text-[#969696]", dateClass)}>
              {date}
            </p>
          </div>
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white bg-opacity-70 backdrop-blur-[2px]">
            <button>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
