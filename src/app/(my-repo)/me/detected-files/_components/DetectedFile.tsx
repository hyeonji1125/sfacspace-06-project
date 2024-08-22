import { Repository } from "@/types/repository";
import AssistChips from "@/components/common/chips/AssistChips";
import Link from "next/link";
import LibraryItem from "@/app/(my-repo)/_components/LibraryItem";

export default function DetectedFile({
  id,
  label,
  title,
  subtitle,
}: Repository) {
  return (
    <Link href={`/ai-analyze/${id}`}>
      <LibraryItem className="border-primary-purple-100">
        <LibraryItem.Chip>
          <AssistChips assistType="outlinePrimary">{label}</AssistChips>
        </LibraryItem.Chip>
        <LibraryItem.TextBox>
          <LibraryItem.Title>{title}</LibraryItem.Title>
          <LibraryItem.Desc>{subtitle}</LibraryItem.Desc>
        </LibraryItem.TextBox>
      </LibraryItem>
    </Link>
  );
}
