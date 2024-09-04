"use client";
import Button from "@/components/common/Button";
import FileInspectionProgress from "../_components/FileInspectionProgress";
import FileList from "../_components/FileList";
import FileViewer from "../_components/FileViewer";
import { useEffect, useState } from "react";
import ReposTitle from "../_components/ReposTitle";
import AnalyzeModal from "../_components/AnalyzeModal";
import { useParams, useSearchParams } from "next/navigation";
import { useGithubStore } from "@/store/useGithubStore";

export default function AnalyzeResultPage() {
  // 임시 code
  const params = useParams();
  const fileParams = useSearchParams();
  const owner = Array.isArray(params.owner) ? params.owner[0] : params.owner;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const repoPath = fileParams.get("repo");
  const filePath = fileParams.get("file");
  const fullPath = repoPath ? `${repoPath}/${filePath || ""}` : filePath || "";

  const [isOpen, setIsOpen] = useState(false); // 모달 state
  const [isWhole, setIsWhole] = useState(false); // 파일 전체를 포함하는 지

  const {
    fetchRepoContents,
    selectFile,
    selectedFiles,
    repoContents,
    clearSelectedFiles,
    toggleSelectFile,
  } = useGithubStore();

  const loadContent = () => {
    if (owner && name) {
      fetchRepoContents(owner, name, repoPath || "");
      clearSelectedFiles();

      if (fullPath) {
        selectFile(owner, name, fullPath);

        if (filePath) {
          toggleSelectFile(fullPath);
        }
      }
    }
  };

  const selectedfileList = repoContents.filter((content) =>
    selectedFiles.includes(content.path),
  );

  const handleWholeButton = () => {
    setIsOpen(true);
    setIsWhole(true);
  };

  const handleButton = () => {
    setIsWhole(selectedFiles.length === repoContents.length);
    setIsOpen(true);
  };

  useEffect(() => {
    loadContent();
  }, [owner, name, repoPath, filePath, selectFile, fetchRepoContents]);

  return (
    <section className="m-auto mb-20 hidden min-h-screen w-full max-w-[1920px] flex-col gap-11 px-20 xl:flex">
      <ReposTitle>{name}</ReposTitle>
      <div className="flex gap-7">
        <div className="flex flex-col justify-stretch gap-6">
          <Button
            type="button"
            theme={"filled"}
            className="h-[107px] w-[247px]"
            onClick={handleWholeButton}
          >
            폴더 전체 검사
          </Button>
          <FileInspectionProgress />
          <FileList owner={owner} name={name} repoPath={repoPath} />
          <Button
            type="button"
            theme={"filled"}
            className="w-[247px]"
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
      />
    </section>
  );
}
