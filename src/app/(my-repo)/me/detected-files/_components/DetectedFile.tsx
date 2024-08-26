import AssistChips from "@/components/common/chips/AssistChips";
import Link from "next/link";
import LibraryItem from "@/app/(my-repo)/_components/LibraryItem";
import { RepositoryProps } from "@/types";

export default function DetectedFile({
  id,
  name,
  description,
  visibility,
  owner,
}: RepositoryProps) {
  return (
    <Link href={`/ai-analyze/${id}`}>
      <LibraryItem>
        <LibraryItem.Chip>
          <AssistChips assistType="outlinePrimary">{visibility}</AssistChips>
        </LibraryItem.Chip>
        <LibraryItem.TextBox>
          <LibraryItem.Title>{name}</LibraryItem.Title>
          <LibraryItem.Desc>{description}</LibraryItem.Desc>
        </LibraryItem.TextBox>
      </LibraryItem>
    </Link>
  );
}
