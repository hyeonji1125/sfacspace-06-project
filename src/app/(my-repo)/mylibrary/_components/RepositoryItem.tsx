import { Repository } from "@/types/repository";
import LibraryItem from "../../_components/LibraryItem";
import AssistChips from "@/components/common/chips/AssistChips";
import Link from "next/link";

export default function RepositoryItem({
  id,
  label,
  title,
  subtitle,
}: Repository) {
  return (
    <Link href={`/ai-analyze/${id}`}>
      <LibraryItem>
        <LibraryItem.Chip>
          <AssistChips assistType="outline">{label}</AssistChips>
        </LibraryItem.Chip>
        <LibraryItem.TextBox>
          <LibraryItem.Title>{title}</LibraryItem.Title>
          <LibraryItem.Desc>{subtitle}</LibraryItem.Desc>
        </LibraryItem.TextBox>
      </LibraryItem>
    </Link>
  );
}
