import PageTitle from "@/components/common/PageTitle";
import LibraryList from "../../_components/LibraryList";

export default function DetectedFilesPage() {
  return (
    <>
      <PageTitle>Clipping Article</PageTitle>
      <LibraryList type="DETECTED" className="gap-6" />
    </>
  );
}
