import { PostDataType } from "@/types";

type DetailHeaderProps = {
  post: PostDataType;
};

export default function DetailMainSection({ post }: DetailHeaderProps) {
  return (
    <>
      <h1>{post.report_content}</h1>
      <h1>{post.table_content}</h1>
    </>
  );
}
