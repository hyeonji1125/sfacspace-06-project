"use client";
import Button from "@/components/common/Button";
import { GoXCircleFill } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { PiArrowsCounterClockwise, PiHourglassHighFill } from "react-icons/pi";
import { useRepoParams } from "../_utils/useRepoParams";
import { useEffect, useState } from "react";
import { useLlama3Store } from "@/store/useLlama3Store";
import { useGetUser } from "@/hooks/useGetUser";
import { useGithubStore } from "@/store/useGithubStore";
import { useResultOpenStore } from "@/store/useResultOpenStore";

export default function InspectionAlert({
  close,
  filePath,
}: {
  close: () => void;
  filePath: string;
}) {
  const stateArr = {
    inprogress: {
      icon: (
        <PiArrowsCounterClockwise className="animate-spinReverse text-5xl text-primary-purple-500 dark:text-primary-purple-300" />
      ),
      title: "검사중...",
      description: ["코드가 많을수록 처리시간이 길어집니다."],
      buttonText: "",
    },
    pending: {
      icon: (
        <PiHourglassHighFill className="animate-flipHourglass text-5xl text-gray-800 dark:text-gray-400" />
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
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-purple-500 dark:bg-primary-purple-300">
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
      title: "파일 검사 완료",
      description: ["검사 결과를 확인해보세요."],
      buttonText: "결과 보러가기",
    },
  };

  const { email } = useGetUser();
  const { owner, name } = useRepoParams();
  const repoId = `${owner}/${name}`;
  const { analysisStatus, startAnalysis } = useLlama3Store((state) => ({
    analysisStatus: state.analysisStatus,
    startAnalysis: state.startAnalysis,
  }));
  const selectedFile = useGithubStore((state) => state.selectedFile);
  const [state, setState] = useState<keyof typeof stateArr | null>(null);
  const setResultOpen = useResultOpenStore((state) => state.setResultOpen);

  const reAnalyzeSubmit = async () => {
    if (email) {
      const encodedRepoId = encodeURIComponent(repoId).replace(/%2F/g, "/");
      await startAnalysis([selectedFile], email, encodedRepoId);
    } else {
      console.error("유효하지 않은 사용자입니다.");
    }
  };

  const fileButtonHandler = (state: string) => {
    if (state === "completed") {
      setResultOpen(true);
    } else if (state === "error") {
      reAnalyzeSubmit();
    }
  };

  useEffect(() => {
    setState(analysisStatus[filePath]);
  }, [analysisStatus, filePath]);

  if (!state) return null;

  return (
    <>
      {state && (
        <div className="absolute right-4 top-4 z-20 flex items-start gap-[18px] rounded-2xl bg-white p-8 shadow-xl dark:bg-custom-dropdown-dark-bg">
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
      )}
    </>
  );
}
