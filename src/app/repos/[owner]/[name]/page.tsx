"use client";

import Button from "@/components/common/Button";
import FileInspectionProgress from "./_components/FileInspectionProgress";
import FileList from "./_components/FileList";
import FileViewer from "./_components/FileViewer";
import { useEffect, useState } from "react";
import ReposTitle from "./_components/ReposTitle";
import AnalyzeModal from "./_components/AnalyzeModal";
import { useGithubStore } from "@/store/useGithubStore";
import LibraryLogin from "../../_components/LibraryLogin";
import { useSession } from "next-auth/react";
import { useRepoParams } from "./_utils/useRepoParams";
import { getSelectedItems } from "./_utils/getSelectedItems";

export default function AnalyzePage() {
  // 임시 code
  const { data: session } = useSession();
  const { owner, name, repoPath } = useRepoParams();

  const [isOpen, setIsOpen] = useState(false); // 모달 state
  const [isWhole, setIsWhole] = useState(false); // 파일 전체를 포함하는 지
  const [isLoading, setIsLoading] = useState(false);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  const {
    fetchRepoContents,
    selectFile,
    selectedFiles,
    repoContents,
    clearSelection,
    clearSelectedFiles,
    toggleSelectFile,
  } = useGithubStore((state) => ({
    fetchRepoContents: state.fetchRepoContents,
    selectFile: state.selectFile,
    selectedFiles: state.selectedFiles,
    repoContents: state.repoContents,
    clearSelection: state.clearSelection,
    clearSelectedFiles: state.clearSelectedFiles,
    toggleSelectFile: state.toggleSelectFile,
  }));

  const loadContent = async () => {
    if (owner && name) {
      setIsLoading(true);
      await fetchRepoContents(owner, name);
      clearSelectedFiles();
      if (repoPath) {
        selectFile(owner, name, repoPath);
        toggleSelectFile(repoPath);
      }
      setIsLoading(false);
    }
  };

  const selectedfileList = getSelectedItems(repoContents, selectedFiles);

  const handleWholeButton = () => {
    setIsWhole(true);
    setIsOpen(true);
  };

  const handleButton = async () => {
    setIsWhole(selectedFiles.length === repoContents.length);

    await Promise.all(
      selectedFiles.map(async (filePath) => {
        await selectFile(owner, name, filePath);
      }),
    );

    // const updatedSelectedFileList = getSelectedItems(repoContents, selectedFiles);
    setIsOpen(true);
  };

  useEffect(() => {
    if (session) {
      clearSelection();
      loadContent();
    }
  }, [session, owner, name]);

  if (!session) {
    return <LibraryLogin />;
  }

  return (
    <section className="m-auto mb-20 hidden min-h-screen w-full max-w-[1920px] flex-col gap-11 px-20 xl:flex">
      <ReposTitle>{name}</ReposTitle>
      <div className="flex gap-7">
        <div className="flex flex-col justify-stretch gap-6">
          <Button
            type="button"
            theme={"filled"}
            className="h-[107px]"
            onClick={handleWholeButton}
          >
            폴더 전체 검사
          </Button>
          <FileInspectionProgress />
          <FileList
            isLoading={isLoading}
            isMultiSelectMode={isMultiSelectMode}
            setIsMultiSelectMode={setIsMultiSelectMode}
          />
          <Button
            type="button"
            theme={"filled"}
            onClick={handleButton}
            disabled={!selectedfileList.length}
          >
            검사하기
          </Button>
        </div>
        <FileViewer />
      </div>
      <AnalyzeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isWhole={isWhole}
        title={name}
        fileList={selectedfileList}
        setIsMultiSelectMode={setIsMultiSelectMode}
      />
    </section>
  );
}
