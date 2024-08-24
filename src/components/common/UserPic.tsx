import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function UserPic({
  image,
  name,
  size = "large",
}: {
  image: string;
  name: string;
  size?: "small" | "large";
}) {
  return (
    <div
      className={twMerge(
        "relative h-[107px] w-[107px] overflow-hidden rounded-full",
        size === "small" && "h-[30px] w-[30px]",
      )}
    >
      <Image
        src={image}
        alt={name}
        sizes="(max-width: 1200px) 200px, 400px"
        fill
        draggable={false}
      />
    </div>
  );
}
