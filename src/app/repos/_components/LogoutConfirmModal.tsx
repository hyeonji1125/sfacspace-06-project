import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { SignOut } from "../../../../public/assets/svg/SvgIcons";
import { customSignOut } from "@/lib/customAuth";
import { useGetUser } from "@/hooks/useGetUser";

export default function LogoutConfirmModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { email } = useGetUser();

  const handleLogout = () => {
    if (email) {
      customSignOut(email, "/");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(false)}
      shadow
      dimmed
      className="mx-6 gap-6 p-12 dark:border dark:border-primary-purple-300"
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
      <Modal.Button className="mt-[18px] w-full">
        <Button
          theme="filled"
          onClick={() => onClose(false)}
          className="w-full max-w-[300px] bg-bg-gray-light font-normal text-line-default hover:shadow-none dark:bg-opacity-10 md:text-xl lg:w-[300px]"
        >
          닫기
        </Button>
        <Button
          theme="filled"
          className="w-full max-w-[300px] font-normal dark:bg-primary-purple-300 dark:font-medium dark:text-custom-dark-bg hover:dark:bg-primary-purple-200 md:text-xl lg:w-[300px]"
          onClick={handleLogout}
        >
          확인
        </Button>
      </Modal.Button>
    </Modal>
  );
}
