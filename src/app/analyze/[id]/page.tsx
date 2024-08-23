import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import FileTabs from "./_components/FileTabs";
import Button from "@/components/common/Button";
import Infobox from "./_components/Infobox";
import FileList from "./_components/FileList";
import FileViewer from "./_components/FileViewer";
import CompletedFileViewer from "./_components/CompletedFileViewer";
import ModifiedCode from "./_components/ModifiedCode";
import PcOnlyMessage from "@/components/common/PcOnlyMessage";

export default function AnalyzePage() {
  return (
    <>
      <PcOnlyMessage />
      <section className="m-auto mb-20 hidden min-h-screen w-full max-w-[1920px] flex-col gap-11 px-20 xl:flex">
        {/*최상단 리포지토리 이름 bar*/}
        <h1 className="flex items-center gap-6 rounded-full border-4 border-primary-purple-500 px-5 py-2 text-4xl text-primary-purple-500">
          <button>
            <IoIosArrowBack />
          </button>
          <span className="font-medium -tracking-[0.01rem]">sfacweb - 1</span>
        </h1>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex items-stretch gap-7">
          <Button type="button" theme={"filled"} className="w-[247px]">
            폴더 전체 검사
          </Button>
          <FileTabs />
        </div>

        <div className="flex w-full gap-7">
          {/* Left Side*/}
          <div className="flex flex-col justify-stretch gap-6">
            <Infobox />
            <FileList />
            <Button type="button" theme={"filled"} className="w-[247px]">
              검사하기
            </Button>
          </div>
          {/* 중앙 컨텐츠 */}
          <div className="flex flex-1 flex-col gap-14">
            <div className="grid grid-cols-2 gap-4">
              <FileViewer />
              <CompletedFileViewer />
            </div>
            <ModifiedCode />
          </div>
        </div>
      </section>
    </>
  );
}
