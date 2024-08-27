import PageTitle from "@/components/common/PageTitle";
import DetectedList from "./_components/DetectedList";

export default function DetectedFilesPage() {
  return (
    <>
      <PageTitle>Detected Files</PageTitle>
      <DetectedList className="gap-6" />
    </>
  );
}
