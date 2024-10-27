"use client";
import { useEffect, useState } from "react";
import Infobox from "./Infobox";
import { PiSpinnerGapBold } from "react-icons/pi";
import { useInView } from "react-intersection-observer";
import { useLlama3Store } from "@/store/useLlama3Store";
import { useGithubStore } from "@/store/useGithubStore";

export default function InspectionResult() {
  const analysisResults = useLlama3Store((state) => state.analysisResults);
  const selectedFile = useGithubStore((state) => state.selectedFile);
  const matchingResults =
    analysisResults?.find((r) => r?.path === selectedFile.path) || null;
  const hasVulnerabilities = matchingResults?.analysisResult?.isVulnerable;
  const firstAnalysis = matchingResults?.analysisResult?.analysis?.[0];
  const noVulnerabilities =
    firstAnalysis &&
    firstAnalysis.title &&
    !firstAnalysis.title.includes("취약점 없음");
  const { ref, inView } = useInView();
  const [loadedItems, setLoadedItems] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      matchingResults &&
      inView &&
      loadedItems < matchingResults.analysisResult.analysis.length &&
      !isLoading
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setLoadedItems((prev) =>
          Math.min(prev + 3, matchingResults.analysisResult.analysis.length),
        );
        setIsLoading(false);
      }, 500);
    }
  }, [inView, loadedItems, isLoading, matchingResults]);

  if (!matchingResults) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <PiSpinnerGapBold className="animate-spin text-[80px] text-text-gray-default" />
      </div>
    );
  }

  return (
    <div className="mt-11">
      {hasVulnerabilities && noVulnerabilities ? (
        <>
          <ul className="flex flex-col gap-7">
            {matchingResults.analysisResult.analysis
              .slice(0, loadedItems)
              .map((item, index) => (
                <li key={`${item.title}-${index}`}>
                  <Infobox
                    {...item}
                    language={matchingResults.analysisResult.language}
                  />
                </li>
              ))}
          </ul>
          {loadedItems < matchingResults.analysisResult.analysis.length && (
            <div ref={ref}>
              {isLoading && (
                <PiSpinnerGapBold className="mx-auto mt-5 animate-spin text-[80px] text-text-gray-default" />
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex h-[300px] flex-col items-center gap-[10px] pt-10">
          <h3 className="text-[28px] font-semibold text-text-gray-dark dark:text-text-gray-light">
            검출된 취약점이 없어요
          </h3>
          <div className="text-center text-xl text-text-gray-default">
            <p>취약점이 발견되지 않았지만 새로 업데이트할 경우</p>
            <p>파일을 한 번 더 검사해주세요.</p>
          </div>
        </div>
      )}
    </div>
  );
}
