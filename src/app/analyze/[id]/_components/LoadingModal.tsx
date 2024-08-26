import Modal from "@/components/common/Modal";
import Image from "next/image";

// loading modal이 언제 쓰이는 지 정확하지 않아서, 일단 검사하기/폴더 전체 검사 버튼 클릭 후 뜨는 모달에서 검사하기 버튼 클릭 시 뜰 수 있게 해놨습니다!
export default function LoadingModal() {
  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      dimmed
      shadow
      className="gap-[53px] p-12"
    >
      <div className="relative">
        <Image
          width={106}
          height={109}
          alt="bugImage"
          src="/assets/images/myRepository/bug.svg"
        />
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="animate-scan absolute -top-4 h-4 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>
      </div>
      <div className="flex flex-col gap-9 text-center">
        <div className="text-2xl font-semibold text-custom-light-text">
          소스코드 취약점 분석중
        </div>
        <div className="text-xl font-medium text-text-gray-default">
          <p>AI 플로디렉터가 문제를 분석중 입니다.</p>
          <p>코드가 많을수록 처리시간이 길어집니다.</p>
        </div>
      </div>
    </Modal>
  );
}
