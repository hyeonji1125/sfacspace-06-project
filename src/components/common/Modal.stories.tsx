import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Modal from "./Modal";
import Button from "./Button";

const meta = {
  title: "common/Modal",
  component: Modal,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    shadow: {
      control: "boolean",
      type: "boolean",
      description:
        "옵셔널한 값으로 modal container의 shadow를 선택할 수 있습니다.",
    },
    dimmed: {
      control: "boolean",
      type: "boolean",
      description:
        "옵셔널한 값으로 modal container 뒷부분의 dimmed 처리를 선택할 수 있습니다.",
    },
    className: {
      control: "text",
      type: "string",
      description:
        "옵셔널한 값으로 필요한 경우 className을 통해 Modal에 추가적인 tailwindCSS 속성을 부여합니다.",
    },
    onClose: {
      description: "modal close 함수를 전달합니다.",
    },
    children: {
      control: "text",
      type: "string",
      description:
        "모달 내부에 전달될 아이템을 정의합니다. <Modal.Title>, <Modal.Desc>, <Modal.Box>, <Modal.Button>, <Modal.Content>",
    },
    isOpen: {
      description:
        "modal open 상태일 경우 scroll 방지를 위해 전달하는 값입니다.",
    },
  },
  args: {
    className: "w-[400px]",
  },
} satisfies Meta<typeof Modal>;

export default meta;

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex h-[400px] w-full items-center justify-center">
      <div id="modal-root" />

      <Button onClick={handleOpen} type="button" theme="outlined" size="small">
        Modal Open
      </Button>

      {isOpen && (
        <Modal {...args} onClose={handleClose}>
          <Modal.Box>
            <Modal.Title>Modal.Title</Modal.Title>
            <Modal.Desc>
              <p>Modal.Desc</p>
              <p>Title과 Desc는 Box로 묶여있습니다.</p>
            </Modal.Desc>
          </Modal.Box>
          <Modal.Content>
            <div className="flex w-full flex-col items-center justify-center border border-black py-4">
              <p>Content</p>
              <p>필요한 아이템을 넣을 수 있어요.</p>
            </div>
          </Modal.Content>
          <Modal.Button>
            <Button
              type="button"
              theme="filled"
              size="small"
              onClick={handleClose}
            >
              Button
            </Button>
          </Modal.Button>
        </Modal>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  shadow: true,
  dimmed: true,
};
