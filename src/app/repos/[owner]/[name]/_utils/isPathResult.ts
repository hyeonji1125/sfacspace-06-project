import { usePathname } from "next/navigation";

export const isPathResult = () => {
  const pathName = usePathname();
  const pathSegments = pathName.split("/");

  return pathSegments[4] === "repo_inspection";
};
