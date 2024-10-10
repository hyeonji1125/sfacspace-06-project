import { useState } from "react";
import ReactDOM from "react-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { ShareFatEnabled } from "../../../../../public/assets/svg/vulnerabilityDbSvg";

export default function ShareButton({ postId }: { postId: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false); // 페이드아웃 상태 추가

  const handleShareClick = async () => {
    try {
      const urlToCopy = `${window.location.origin}/vuldb/items/${postId}`;
      await navigator.clipboard.writeText(urlToCopy);
      setIsCopied(true);

      setTimeout(() => {
        setIsFadingOut(true); // 페이드아웃 시작
        setTimeout(() => {
          setIsCopied(false);
          setIsFadingOut(false); // 초기화
        }, 1000); // 페이드아웃 지속 시간을 1초로 설정
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const renderModal = () => {
    return ReactDOM.createPortal(
      <div
        className={`fixed bottom-6 left-1/2 z-[9999] flex h-[80px] w-1/2 -translate-x-1/2 transform items-center justify-center gap-3 rounded-2xl bg-primary-purple-500 p-4 shadow-lg transition-opacity duration-1000 ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-base font-medium text-white">
          링크가 복사되었습니다!
        </p>
        <p className="text-white">
          <BsCheckCircleFill size={25} />
        </p>
      </div>,
      document.getElementById("modal-root") as HTMLElement, // RootLayout의 modal-root에 모달을 렌더링
    );
  };

  return (
    <div>
      <button onClick={handleShareClick}>
        <ShareFatEnabled />
      </button>

      {isCopied && renderModal()}
    </div>
  );
}
