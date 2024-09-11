import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { ShareFatEnabled } from "../../../../../public/assets/svg/vulnerabilityDbSvg";

export default function ShareButton({ postId }: { postId: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShareClick = async () => {
    try {
      const urlToCopy = `${window.location.origin}/vuldb/items/${postId}`;
      await navigator.clipboard.writeText(urlToCopy);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleShareClick}>
        <ShareFatEnabled />
      </button>

      {isCopied && (
        <div className="fixed bottom-6 left-1/2 z-50 flex h-[110px] w-[230px] -translate-x-1/2 transform flex-col items-center justify-center gap-3 rounded-2xl bg-primary-purple-500 p-4 shadow-lg">
          <p className="text-white">
            <BsCheckCircleFill size={25} />
          </p>
          <p className="text-base font-medium text-white">
            링크가 복사되었습니다!
          </p>
        </div>
      )}
    </div>
  );
}
