import Image from "next/image";
import { twMerge } from "tailwind-merge";

type TUserPicProps = {
  image?: string;
  name: string;
  size?: "small" | "large";
};

export default function UserPic({
  image,
  name,
  size = "large",
}: TUserPicProps) {
  return (
    <div
      className={twMerge(
        "relative h-[107px] w-[107px] overflow-hidden rounded-full",
        size === "small" && "h-[30px] w-[30px]",
      )}
    >
      <Image
        src={image ?? "https://picsum.photos/100/100"}
        alt={name}
        sizes="(max-width: 1200px) 200px, 400px"
        fill
        draggable={false}
      />
    </div>
  );
}
