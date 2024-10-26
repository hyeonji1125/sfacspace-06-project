"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useGetUser } from "@/hooks/useGetUser";
import { useLlama3Store } from "@/store/useLlama3Store";
import { RepositoryContent, TAnalyzeModalProp } from "@/types";
import { useEffect } from "react";
import { RxFile } from "react-icons/rx";
import { useRepoParams } from "../_utils/useRepoParams";
import { useGithubStore } from "@/store/useGithubStore";

export default function AnalyzeModal({
  isOpen,
  setIsOpen,
  fileList,
  setIsMultiSelectMode,
}: TAnalyzeModalProp) {
  const { startAnalysis, analysisResults } = useLlama3Store();
  const { clearSelectedFiles } = useGithubStore((state) => ({
    clearSelectedFiles: state.clearSelectedFiles,
  }));
  const { email } = useGetUser();
  const { owner, name } = useRepoParams();
  const repoId = `${owner}/${name}`;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (email) {
      setIsMultiSelectMode(false);
      setIsOpen(false);
      clearSelectedFiles();
      const encodedRepoId = encodeURIComponent(repoId).replace(/%2F/g, "/");
      await startAnalysis(fileList, email, encodedRepoId);
    } else {
      console.error("유효하지 않은 사용자입니다.");
    }
  };

  // 파일 목록 렌더링 함수
  const renderFileList = (files: RepositoryContent[], title: string) => (
    <div>
      <div className="py-2 text-center text-xl font-semibold">{title}</div>
      <div className="custom-scrollbar max-h-[220px] overflow-hidden overflow-y-auto">
        <ul className="overflow-hidden rounded-lg border border-line-default dark:border-line-dark/30">
          {files.map((file) => (
            <li
              key={file.sha}
              className="flex w-[450px] items-center justify-between border-b border-line-default p-[10px] last:border-b-0 dark:border-line-dark/50"
            >
              <div className="flex w-60 items-center gap-[10px]">
                <RxFile className="flex-shrink-0 text-2xl text-[#848484]" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {file.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // 새로 검사할 파일 및 재검사할 파일 필터링
  const newFiles = fileList.filter((file) =>
    analysisResults.every((result) => result.path !== file.path),
  );
  const recheckFiles = fileList.filter((file) =>
    analysisResults.some((result) => result.path === file.path),
  );

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          shadow
          dimmed
          className="gap-10 p-12"
        >
          <p className="text-nowrap text-2xl font-medium">
            선택된 파일을 검사하시겠습니까?
          </p>
          <Modal.Content>
            <div className="flex gap-4">
              {newFiles.length > 0 &&
                renderFileList(newFiles, "새로 검사할 파일")}
              {recheckFiles.length > 0 &&
                renderFileList(recheckFiles, "재검사할 파일")}
            </div>
          </Modal.Content>
          <Modal.Button>
            <Button
              type="button"
              theme="outlined"
              size="small"
              onClick={handleClose}
            >
              닫기
            </Button>
            <Button
              type="button"
              theme="filled"
              size="small"
              onClick={handleSubmit}
            >
              검사하기
            </Button>
          </Modal.Button>
        </Modal>
      )}
    </>
  );
}
