"use client";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { TAnalyzeModalProp } from "@/types";
import { AiFillFolderOpen } from "react-icons/ai";
import { FaRegFolderOpen } from "react-icons/fa6";
import { RxFile } from "react-icons/rx";

export default function AnalyzeModal({
  isOpen,
  setIsOpen,
  isWhole,
  title,
  fileList,
}: TAnalyzeModalProp) {
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    setIsOpen(false);
  };

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
            {isWhole ? "폴더 전체를" : "선택된 파일을"} 검사하시겠습니까?
          </p>
          <Modal.Content>
            {isWhole ? (
              <div className="flex flex-col items-center gap-3">
                <AiFillFolderOpen className="text-5xl text-primary-purple-500" />
                <span className="text-xl">{title}</span>
              </div>
            ) : (
              <div className="custom-scrollbar max-h-[220px] overflow-hidden overflow-y-auto">
                <ul className="grid w-[450px] grid-cols-3 gap-3 overflow-hidden">
                  {fileList.map((file) => (
                    <li key={file.sha}>
                      <div className="flex items-center gap-2 rounded-[10px] border border-line-gray-10 p-4">
                        <RxFile className="flex-shrink-0 text-xl text-[#848484]" />
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {file.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
