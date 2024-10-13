import { useSession } from "next-auth/react";
import { IoIosCode } from "react-icons/io";
import { IoClose, IoEllipse, IoTriangle } from "react-icons/io5";

export default function FileInspectionProgress() {
  const inspectionData = [
    {
      icon: <IoIosCode className="text-3xl text-accent-blue" />,
      label: "검사한 파일 개수",
      count: 0,
    },
    {
      icon: <IoClose className="text-3xl text-accent-red" />,
      label: "검출된 취약점",
      count: 0,
    },
    {
      icon: <IoEllipse className="ml-1 text-2xl text-accent-green" />,
      label: "문제 없음",
      count: 0,
    },
  ];

  const { status } = useSession();

  if (status === "loading") {
    return (
      <ul className="flex animate-pulse flex-col gap-4 px-2">
        {[...Array(3)].map((_, index) => (
          <li key={index} className="flex justify-between text-xl">
            <div className="flex items-center gap-[10px]">
              <div className="h-7 w-7 rounded-full bg-grayscale-10 dark:bg-grayscale-80"></div>
              <div className="h-7 w-28 rounded bg-grayscale-10 dark:bg-grayscale-80"></div>
            </div>
            <div className="h-7 w-8 rounded bg-grayscale-10 dark:bg-grayscale-80"></div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-4 px-2">
      {inspectionData.map((item, index) => (
        <li key={index} className="flex justify-between text-xl">
          <div className="flex items-center gap-[10px]">
            {item.icon}
            <span className="text-lg">{item.label}</span>
          </div>
          <span className="text-lg">{item.count}</span>
        </li>
      ))}
    </ul>
  );
}
