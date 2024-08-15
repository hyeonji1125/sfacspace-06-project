import ProgressBar from "@/components/common/ProgressBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "common/ProgressBar", // 경로를 지정함
  component: ProgressBar, //스토리가 사용되는 컴포넌트
  tags: ["autodocs"], //// 설명을 보여주는 방법. 굳이 수정할 필요 없음
  parameters: {
    // 스토리북 웹에서 스토리를 어떻게 보여줄지.
    layout: "padded", // 3가지 옵션이 있는데 `centered`가 가장 보기 좋음
  },
  argTypes: {
    // 컴포넌트다 받는 props들에 대한 설명 + 설정
    // argTypes를 상세히 작성할수록 소통에 유리함
    percent: {
      control: {},
      description: "퍼센트 값",
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percent: 0,
  },
};
