"use client";

import ReposFilterButtons from "./ReposFilterButtons";
import { RepositoryProps } from "@/types";
import { useState } from "react";
import { useFilterRepos } from "../../../hooks/useFilterItems";
import LibraryToolbar, { TDropdownSelect } from "./LibraryToolbar";

export default function ReposToolbar({
  setRepos,
  repositories,
}: {
  setRepos: React.Dispatch<React.SetStateAction<RepositoryProps[]>>;
  repositories: RepositoryProps[];
}) {
  const [selectedItem, setSelectedItem] = useState<TDropdownSelect>({
    type: "Type",
    sort: "Sort",
  });
  const typeOptions = ["전체", "검사완료", "검사중"];

  useFilterRepos(selectedItem, setRepos, repositories);

  return (
    <div className="flex flex-col gap-12">
      <ReposFilterButtons setRepos={setRepos} repositories={repositories} />
      <LibraryToolbar
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
        options={typeOptions}
      />
    </div>
  );
}
