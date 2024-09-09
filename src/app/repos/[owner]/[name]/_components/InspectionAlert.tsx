"use client";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { GoXCircleFill } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { PiArrowsCounterClockwise, PiHourglassHighFill } from "react-icons/pi";
import { useRepoParams } from "../_utils/useRepoParams";

export default function InspectionAlert({ close }: { close: () => void }) {
  const router = useRouter();
  const stateArr = {
    inprogress: {
      icon: (
        <PiArrowsCounterClockwise className="animate-spinReverse text-5xl text-primary-purple-500" />
      ),
      title: "검사중...",
      description: ["코드가 많을수록 처리시간이 길어집니다."],
      buttonText: "",
    },
    pending: {
      icon: (
        <PiHourglassHighFill className="animate-flipHourglass text-5xl text-gray-800" />
      ),
      title: "검사 대기중",
      description: [
        "순차적으로 파일 검사가 진행됩니다.",
        "잠시만 대기해주시면 검사가 시작됩니다.",
      ],
      buttonText: "",
    },
    error: {
      icon: <GoXCircleFill className="text-5xl text-accent-red" />,
      title: "Error",
      description: ["오류가 발생했습니다.", "다시 시도해주세요."],
      buttonText: "다시 시도하기",
    },
    completed: {
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-purple-500">
          <svg
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <polyline
              className="animate-drawCheck"
              points="14,27 22,34 36,16"
              stroke="white"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="60"
              strokeDashoffset="60"
            />
          </svg>
        </div>
      ),
      title: "프로젝트 검사 완료",
      description: ["검사 결과를 확인해보세요."],
      buttonText: "결과 보러가기",
    },
  };

  const state = "completed";
  const { owner, name, repoPath } = useRepoParams();

  const fileButtonHandler = (state: string) => {
    if (state === "completed") {
      const targetURL = `/repos/${owner}/${name}/repo_inspection?repo=${repoPath}`;
      router.push(targetURL);
    }
  };

  return (
    <div className="absolute right-4 top-4 z-20 flex items-start gap-[18px] rounded-2xl bg-white p-8 shadow-xl">
      {stateArr[state].icon}
      <div className="flex w-[314px] flex-col gap-4 pt-[10px]">
        <p className="text-xl font-medium">{stateArr[state].title}</p>
        <div>
          {stateArr[state].description.map((text) => (
            <p
              key={text}
              className="text-xl font-medium text-text-gray-default"
            >
              {text}
            </p>
          ))}
        </div>
        {stateArr[state].buttonText && (
          <Button
            theme={"filled"}
            className="text-2xl font-medium"
            onClick={() => fileButtonHandler(state)}
          >
            {stateArr[state].buttonText}
          </Button>
        )}
      </div>
      <button onClick={close}>
        <IoCloseOutline className="text-[32px]" />
      </button>
    </div>
  );
}
