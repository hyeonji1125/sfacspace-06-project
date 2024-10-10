import { addScrapPost, getScrapPosts, removeScrapPost } from "@/lib/scrapPost";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  PushPinActived,
  PushPinEnabled,
} from "../../../../../public/assets/svg/vulnerabilityDbSvg";

export default function PinButton({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const [isScraped, setIsScraped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 상태 추가
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkScrapStatus = async () => {
      if (session && session.user && session.user.email) {
        const scrapPosts = await getScrapPosts(session.user.email);
        const isAlreadyScraped = scrapPosts.some((post) => post.id === postId);
        setIsScraped(isAlreadyScraped);
      }
    };
    checkScrapStatus();
  }, [session, postId]);

  const handleScrapClick = async () => {
    if (isLoading) return; // 중복 클릭 방지
    setIsLoading(true); // 로딩 시작

    if (session && session.user && session.user.email) {
      if (isScraped) {
        // 스크랩 삭제
        await removeScrapPost(session.user.email, postId);
        setIsScraped(false);
        setModalMessage("스크랩이 삭제되었습니다!"); // 메시지 설정
        triggerModal();
      } else {
        // 스크랩 추가
        await addScrapPost(session.user.email, postId);
        setIsScraped(true);
        setModalMessage("스크랩이 완료되었습니다!"); // 메시지 설정
        triggerModal();
      }
    }

    setIsLoading(false); // 로딩 종료
  };

  const triggerModal = () => {
    setShowModal(true);
    setIsFadingOut(false);

    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setShowModal(false); // 모달 닫기
      }, 1000); // 페이드아웃 지속 시간
    }, 500);
  };

  const renderModal = () => {
    return ReactDOM.createPortal(
      <div
        className={`fixed bottom-6 left-1/2 z-[9999] flex h-[70px] w-1/3 -translate-x-1/2 transform flex-col items-center justify-center gap-3 rounded-2xl bg-primary-purple-500 p-4 shadow-lg transition-opacity duration-1000 ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-base font-medium text-white">{modalMessage}</p>
      </div>,
      document.getElementById("modal-root") as HTMLElement,
    );
  };

  return (
    <div>
      <button onClick={handleScrapClick} disabled={isLoading}>
        {isScraped ? <PushPinActived /> : <PushPinEnabled />}
      </button>

      {showModal && renderModal()}
    </div>
  );
}
