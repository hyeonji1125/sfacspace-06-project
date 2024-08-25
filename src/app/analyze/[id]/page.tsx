"use client";
import { IoIosArrowBack } from "react-icons/io";
import FileTabs from "./_components/FileTabs";
import Button from "@/components/common/Button";
import Infobox from "./_components/Infobox";
import FileList from "./_components/FileList";
import FileViewer from "./_components/FileViewer";
import CompletedFileViewer from "./_components/CompletedFileViewer";
import ModifiedCode from "./_components/ModifiedCode";
import PcOnlyMessage from "@/components/common/PcOnlyMessage";
import AnalyzeModal from "./_components/AnalyzeModal";
import { useState } from "react";
import { useFileStore } from "@/store/useFileStore";
import PageTitle from "@/components/common/PageTitle";

export default function AnalyzePage() {
  // 임시 code
  const list = useFileStore((state) => state.list);
  const selectedFiles = list.filter((item) => item.isSelected);

  const [isOpen, setIsOpen] = useState(false); // 모달 state
  const [isWhole, setIsWhole] = useState(false); // 파일 전체를 포함하는 지

  const handleWholeButton = () => {
    setIsOpen(true);
    setIsWhole(true);
  };

  const handleButton = () => {
    setIsOpen(true);
    if (list.length === selectedFiles.length) {
      setIsWhole(true);
    } else {
      setIsWhole(false);
    }
  };

  return (
    <>
      <PcOnlyMessage />
      <section className="m-auto mb-20 hidden min-h-screen w-full max-w-[1920px] flex-col gap-11 px-20 xl:flex">
        <PageTitle className="min-w-full justify-start px-5 py-2">
          sfacweb-1
        </PageTitle>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex items-stretch gap-7">
          <Button
            type="button"
            theme={"filled"}
            className="w-[247px]"
            onClick={handleWholeButton}
          >
            폴더 전체 검사
          </Button>
          <FileTabs />
        </div>

        <div className="flex w-full gap-7">
          {/* Left Side*/}
          <div className="flex flex-col justify-stretch gap-6">
            <Infobox />
            <FileList />
            <Button
              type="button"
              theme={"filled"}
              className="w-[247px]"
              onClick={handleButton}
              disabled={!selectedFiles.length}
            >
              검사하기
            </Button>
          </div>
          {/*File Viewer*/}
          <div className="flex flex-1 flex-col gap-14">
            <div className="grid grid-cols-2 gap-4">
              <FileViewer />
              <CompletedFileViewer />
            </div>
            <ModifiedCode />
          </div>
        </div>
        <AnalyzeModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isWhole={isWhole}
          selectedFiles={selectedFiles}
        />
      </section>
    </>
  );
}
