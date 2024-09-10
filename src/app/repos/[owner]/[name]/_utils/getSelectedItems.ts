import { RepositoryContent } from "@/types";

export const getSelectedItems = (
  nodes: RepositoryContent[],
  selectedFiles: string[],
): RepositoryContent[] => {
  let selectedItems: RepositoryContent[] = [];

  nodes.forEach((node) => {
    if (selectedFiles.includes(node.path)) {
      selectedItems.push(node);
    }

    if (node.children && node.children.length > 0) {
      selectedItems = [
        ...selectedItems,
        ...getSelectedItems(node.children, selectedFiles),
      ];
    }
  });

  return selectedItems;
};
