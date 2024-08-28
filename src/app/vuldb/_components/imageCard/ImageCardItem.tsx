import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ArrowRight } from "../../../../../public/assets/svg/vulnerabilityDbSvg";

type ImageCardProps = {
  id: number;
  title: string;
  date: string;
  image: "cardImage1" | "cardImage2" | "cardImage3";
};

export default function ImageCard({ id, title, date, image }: ImageCardProps) {
  const imageSrc = {
    cardImage1:
      "bg-[url('/assets/images/vulnerability-db/CardImg1.png')] w-[625px]",
    cardImage2:
      "bg-[url('/assets/images/vulnerability-db/CardImg2.png')] w-[316px]",
    cardImage3:
      "bg-[url('/assets/images/vulnerability-db/CardImg3.png')] w-[316px]",
  };

  const titleClass =
    image === "cardImage1" ? "text-[28px] w-[420px]" : "text-lg w-[136px]";
  const dateClass =
    image === "cardImage1" ? "text-xl  w-[420px]" : "text-xs w-[136px]";

  return (
    <Link href={`/vulnerability-db/${id}`}>
      <div
        className={twMerge(
          "flex h-[390px] rounded-[20px] bg-cover bg-center",
          imageSrc[image],
        )}
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
