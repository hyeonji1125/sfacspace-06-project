"use client";

import Button from "@/components/common/Button";
import { useGithubStore } from "@/store/useGithubStore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LibraryLogin from "../../_components/LibraryLogin";
import AnalyzeModal from "./_components/AnalyzeModal";
import FileInspectionProgress from "./_components/FileInspectionProgress";
import FileList from "./_components/FileList";
import FileViewer from "./_components/FileViewer";
import ReposTitle from "./_components/ReposTitle";
import { getSelectedItems } from "./_utils/getSelectedItems";
import { useRepoParams } from "./_utils/useRepoParams";
import InspectionResult from "./_components/InspectionResult";
import { useResultOpenStore } from "@/store/useResultOpenStore";

export default function AnalyzePage() {
  // 임시 code
  const { data: session, status } = useSession();
  const { owner, name } = useRepoParams();
  const [isOpen, setIsOpen] = useState(false); // 모달 state
  const [isLoading, setIsLoading] = useState(false);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  const resultOpen = useResultOpenStore((state) => state.resultOpen);
  const {
    fetchRepoContents,
    selectFile,
    selectedFiles,
    repoContents,
    clearSelection,
    clearSelectedFiles,
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
      setIsLoading(false);
    }
  };

  const selectedfileList = getSelectedItems(repoContents, selectedFiles);

  const handleButton = async () => {
    if (Array.isArray(selectedFiles) && selectedFiles.length > 0) {
      await Promise.all(
        selectedFiles.map(async (filePath) => {
          await selectFile(owner, name, filePath);
        }),
      );
    }

    // const updatedSelectedFileList = getSelectedItems(repoContents, selectedFiles);
    setIsOpen(true);
  };

  useEffect(() => {
    if (session) {
      clearSelection();
      loadContent();
    }
  }, [session, owner, name]);

  if (status === "unauthenticated") {
    return <LibraryLogin />;
  }
  return (
    <section className="m-auto mb-20 hidden min-h-screen w-full max-w-[1920px] flex-col gap-11 px-20 xl:flex">
      <ReposTitle>{name}</ReposTitle>
      <div className="flex gap-7">
        <div className="z-16 flex flex-col justify-stretch gap-6">
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
        <div className="w-full">
          <FileViewer />
          {resultOpen && <InspectionResult />}
        </div>
      </div>
      <AnalyzeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fileList={selectedfileList}
        setIsMultiSelectMode={setIsMultiSelectMode}
      />
    </section>
  );
}
