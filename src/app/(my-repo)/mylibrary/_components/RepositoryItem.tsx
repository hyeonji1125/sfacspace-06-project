import LibraryItem from "../../_components/LibraryItem";
import AssistChips from "@/components/common/chips/AssistChips";
import Link from "next/link";
import { RepositoryProps } from "@/types";

export default function RepositoryItem({
  id,
  name,
  description,
  visibility,
  owner,
}: RepositoryProps) {
  return (
    <Link href={`/analyze/${owner.login}/${name}`}>
      <LibraryItem>
        <LibraryItem.Chip>
          <AssistChips assistType="outline">{visibility}</AssistChips>
        </LibraryItem.Chip>
        <LibraryItem.TextBox>
          <LibraryItem.Title>{name}</LibraryItem.Title>
          <LibraryItem.Desc>{description || 'No description'}</LibraryItem.Desc>
        </LibraryItem.TextBox>
      </LibraryItem>
    </Link>
  );
}
