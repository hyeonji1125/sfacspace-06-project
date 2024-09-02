import Dropdown from "@/components/common/Dropdown";
import { SetStateAction } from "react";

export type TDropdownSelect = {
  type: string;
  sort: string;
};

export default function LibraryToolbar({
  selectedItem,
  onSelect,
  options,
}: {
  selectedItem: { type: string; sort: string };
  onSelect: React.Dispatch<SetStateAction<TDropdownSelect>>;
  options: string[];
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <h3 className="text-[32px] font-medium text-text-gray-dark dark:text-custom-dark-text">
        Library
      </h3>
      <div className="flex gap-[10px]">
        <Dropdown
          selectedOption={selectedItem.type}
          onSelect={onSelect}
          options={options}
          type="type"
        />
        <Dropdown
          selectedOption={selectedItem.sort}
          onSelect={onSelect}
          type="sort"
        />
      </div>
    </div>
  );
}
