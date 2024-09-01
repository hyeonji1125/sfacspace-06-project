import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { SignOut } from "../../../../public/assets/svg/SvgIcons";
import { useGithubStore } from "@/store/useGithubStore";
import { signOut } from "next-auth/react";

/**
 *
 * @todo
 * - 로그아웃 로직 연결 (user 삭제, signOut, redirect "/")
 *
 */

export default function LogoutComfirmModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const clearRepoStorage = useGithubStore.persist.clearStorage;

  const handleLogout = () => {
    clearRepoStorage();
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(false)}
      shadow
      dimmed
      className="gap-9 p-12"
    >
      <Modal.Content>
        <SignOut color="dark:fill-custom-dark-text" />
      </Modal.Content>
      <Modal.Box>
        <Modal.Title>정말 로그아웃 할까요?</Modal.Title>
        <Modal.Desc>
          <p>
            소스코드 보안을 위하여 모든 히스토리와 코드 저장 내역이 삭제됩니다.
            <br />
            아래 버튼을 누르면 모든 데이터를 삭제하게 되고 로그아웃 처리가
            됩니다.
          </p>
        </Modal.Desc>
      </Modal.Box>
      <Modal.Button className="mt-[18px]">
        <Button
          theme="filled"
          onClick={() => onClose(false)}
          className="w-[300px] bg-bg-gray-light font-normal text-line-default hover:shadow-none"
        >
          닫기
        </Button>
        <Button
          theme="filled"
          className="w-[300px] font-normal"
          onClick={handleLogout}
        >
          확인
        </Button>
      </Modal.Button>
    </Modal>
  );
}
