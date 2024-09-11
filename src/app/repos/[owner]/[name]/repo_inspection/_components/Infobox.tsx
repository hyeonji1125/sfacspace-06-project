import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { PiCopy } from "react-icons/pi";

export default function Infobox({
  title,
  error,
  description,
  language,
  modifiedCode,
}: {
  title: string;
  error: string;
  description: string;
  language: string;
  modifiedCode: string;
}) {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopyClick = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-8 rounded-xl bg-bg-red-light p-5 dark:bg-bg-red-light/5">
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-2">
          <code className="text-2xl font-semibold text-accent-red">
            {title}
          </code>
          <button
            type="button"
            className="whitespace-nowrap rounded-full border-2 border-accent-red px-2 text-accent-red hover:bg-white dark:hover:bg-white/20"
          >
            위치보기
          </button>
        </div>
        <div className="space-y-6 text-lg font-medium text-text-gray-dark dark:text-text-gray-default">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="mx-2 h-1 w-1 rounded-full bg-text-gray-dark dark:bg-text-gray-default" />
              <span className="pr-1">취약점 : </span>
            </div>
            <p>{error}</p>
          </div>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <h3 className="text-2xl font-bold text-text-gray-dark dark:text-text-gray-light">
          수정된 코드
        </h3>
        <div className="w-fit gap-[10px] rounded-[10px] bg-grayscale-80">
          <div className="flex justify-between px-5 py-4 text-lg font-medium text-text-gray-light">
            <span>{language}</span>
            {isCopy ? (
              <div className="flex items-center gap-[10px]">
                <FaCheck />
                <span>Copied!</span>
              </div>
            ) : (
              <button
                className="flex items-center gap-[10px]"
                onClick={() => handleCopyClick(modifiedCode)}
              >
                <PiCopy />
                <span>코드복사</span>
              </button>
            )}
          </div>
          <div className="custom-scrollbar max-h-[400px] overflow-auto px-5 py-4 text-lg font-medium text-white">
            <pre>
              <code className="inline-block whitespace-pre-wrap break-words">
                {modifiedCode}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
