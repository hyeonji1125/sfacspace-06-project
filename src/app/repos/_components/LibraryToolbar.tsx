"use client";

import Dropdown from "@/components/common/Dropdown";
import { SetStateAction, useState } from "react";

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
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null); // 열려있는 드롭다운 ID 관리

  return (
    <div className="flex w-full items-center justify-between">
      <h3 className="text-[32px] font-medium text-text-gray-dark dark:text-custom-dark-text">
        Library
      </h3>
      <div className="flex gap-[10px]">
        <Dropdown
          id="type-dropdown"
          selectedOption={selectedItem.type}
          onSelect={(option) => onSelect((prev) => ({ ...prev, type: option }))}
          options={options}
          type="type"
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
        />
        <Dropdown
          id="sort-dropdown"
          selectedOption={selectedItem.sort}
          onSelect={(option) => onSelect((prev) => ({ ...prev, sort: option }))}
          type="sort"
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
        />
      </div>
    </div>
  );
}
