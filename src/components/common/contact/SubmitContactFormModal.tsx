import Button from "../Button";
import Modal from "../Modal";

export default function SubmitContactFormModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(false)}
      dimmed
      className="mx-6 gap-4 p-[60px] sm:gap-6"
    >
      <Modal.Box>
        <Modal.Title className="font-bold">문의를 보냈어요!</Modal.Title>
        <Modal.Desc>
          <p className="flex flex-col sm:flex-row sm:gap-1">
            <span>문의를 성공적으로 전송했어요.</span>
            <span>빠른 시일내에 답변해드릴게요.</span>
          </p>
        </Modal.Desc>
      </Modal.Box>
      <Modal.Button className="mt-[18px]">
        <Button
          theme="filled"
          onClick={() => onClose(false)}
          className="w-[335px] text-base font-semibold hover:shadow-none sm:text-lg md:text-lg xl:text-lg"
        >
          닫기
        </Button>
      </Modal.Button>
    </Modal>
  );
}
