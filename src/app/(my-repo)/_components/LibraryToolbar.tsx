import Dropdown from "@/components/common/Dropdown";

export default function LibraryToolbar() {
  return (
    <div className="flex w-full items-center justify-between">
      <h3 className="text-[32px] font-medium text-text-gray-dark">Library</h3>
      <div className="flex gap-[10px]">
        <Dropdown type="Type" />
        <Dropdown type="Sort" />
      </div>
    </div>
  );
}
