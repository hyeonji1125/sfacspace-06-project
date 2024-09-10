import PinButton from "@/app/vuldb/_components/button/PinButton";
import ShareButton from "@/app/vuldb/_components/button/ShareButton";
import { formatExactTime } from "@/app/vuldb/_utils/formatDate";
import SuggestionChips from "@/components/common/chips/SuggestionChips";
import { PostDataType } from "@/types";

type DetailHeaderProps = {
  post: PostDataType;
};

export default function DetailHeader({ post }: DetailHeaderProps) {
  const uploadAtValue = post.upload_at || new Date().toISOString();
  const relativeDate = formatExactTime(uploadAtValue);
  return (
    <header className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        {(post.chips === "new" || post.chips === "hot") && (
          <SuggestionChips width="59" height="35" color={post.chips}>
            {post.chips.toUpperCase()}
          </SuggestionChips>
        )}
        <h1 className="text-4xl font-medium">{post.title}</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-9 text-xl font-normal text-text-gray-default">
          <p>취약성 뉴스 세부정보</p>
          <p>업로드시간 | {relativeDate}</p>
          <p>출시시간 | {post.create_at}</p>
          <p>조회수 | {post.views}</p>
          {/* 이거 조회수 잘 올라가는지 확인하려고 놥둠 */}
        </div>
        <div className="flex space-x-3">
          <PinButton postId={post.id} />
          <ShareButton postId={post.id} />
        </div>
      </div>
    </header>
  );
}
