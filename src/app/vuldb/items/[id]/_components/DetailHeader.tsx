import { formatExactTime } from "@/app/vuldb/_utils/formatDate";
import SuggestionChips from "@/components/common/chips/SuggestionChips";
import { MockPostCardTypes } from "@/types";
import {
  PushPinEnabled,
  ShareFatEnabled,
} from "../../../../../../public/assets/svg/vulnerabilityDbSvg";

type DetailHeaderProps = {
  post: MockPostCardTypes;
};

export default function DetailHeader({ post }: DetailHeaderProps) {
  const exactDate = formatExactTime(post.date);
  return (
    <header className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <SuggestionChips width="59" height="35" color="new">
          NEW
        </SuggestionChips>
        <h1 className="text-4xl font-medium">{post.title}</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-9 text-xl font-normal text-text-gray-default">
          <p>취약성 뉴스 세부정보</p>
          <p>출시시간 | {exactDate}</p>
        </div>
        <div className="flex space-x-3">
          <button>
            <PushPinEnabled />
          </button>
          <button>
            <ShareFatEnabled />
          </button>
        </div>
      </div>
    </header>
  );
}
