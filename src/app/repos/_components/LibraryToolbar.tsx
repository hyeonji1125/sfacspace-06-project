import Dropdown from "@/components/common/Dropdown";

/**
 * @todo
 * - 리스트 정렬 기능
 */

export default function LibraryToolbar() {
  return (
    <div className="flex w-full items-center justify-between">
      <h3 className="text-[32px] font-medium text-text-gray-dark dark:text-custom-dark-text">
        Library
      </h3>
      <div className="flex gap-[10px]">
        <Dropdown type="Type" />
        <Dropdown type="Sort" />
      </div>
    </div>
  );
}
