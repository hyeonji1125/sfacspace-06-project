import AssistChips from "@/components/common/chips/AssistChips";
import Link from "next/link";
import LibraryItem from "@/app/(my-repo)/_components/LibraryItem";

/**
 * @todo
 * - 임시 타입 변경
 * - 디자인 변경 수정
 * */

export type DetectedFilesProps = {
  id: number;
  name: string;
  // html_url: string;
  owner: {
    login: string;
  };
  visibility: "public" | "private";
  date: string;
};

export default function DetectedFile({
  id,
  name,
  date,
  visibility,
  owner,
}: DetectedFilesProps) {
  return (
    <Link href={`/ai-analyze/${id}`}>
      <LibraryItem>
        <LibraryItem.Chip>
          <AssistChips assistType="outlinePrimary">{visibility}</AssistChips>
        </LibraryItem.Chip>
        <LibraryItem.TextBox>
          <LibraryItem.Title>{name}</LibraryItem.Title>
          <LibraryItem.Desc>{date}</LibraryItem.Desc>
        </LibraryItem.TextBox>
      </LibraryItem>
    </Link>
  );
}
