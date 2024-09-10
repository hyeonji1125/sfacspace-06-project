import { addScrapPost, getScrapPosts, removeScrapPost } from "@/lib/scrapPost";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  PushPinActived,
  PushPinEnabled,
} from "../../../../../public/assets/svg/vulnerabilityDbSvg";

export default function PinButton({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const [isScraped, setIsScraped] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    if (session && session.user && session.user.email) {
      if (isScraped) {
        // 이미 스크랩된 상태 -> 스크랩 삭제
        await removeScrapPost(session.user.email, postId);
        setIsScraped(false);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      } else {
        // 스크랩되지 않은 상태 -> 스크랩 추가
        await addScrapPost(session.user.email, postId);
        setIsScraped(true);
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      }
    }
  };

  return (
    <div>
      <button onClick={handleScrapClick}>
        {isScraped ? <PushPinActived /> : <PushPinEnabled />}
      </button>

      {showModal && (
        <div className="fixed bottom-6 left-1/2 z-50 flex h-[110px] w-[230px] -translate-x-1/2 transform flex-col items-center justify-center gap-3 rounded-2xl bg-primary-purple-500 p-4 shadow-lg">
          {isScraped ? (
            <>
              <p className="text-base font-medium text-white">
                스크랩이 완료되었습니다!
              </p>
              <p className="text-sm font-normal text-[#969696]">
                MY저장소 &gt; 스크랩 저장
              </p>
            </>
          ) : (
            <p className="text-base font-medium text-white">
              스크랩이 삭제되었습니다!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
