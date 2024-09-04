import { MockPostCardTypes } from "@/types";

type DetailHeaderProps = {
  post: MockPostCardTypes;
};

export default function DetailMainSection({ post }: DetailHeaderProps) {
  return (
    <>
      <h1>{post.reportContent}</h1>
    </>
  );
}
