import { usePathname } from "next/navigation";

export const useIsPathResult = () => {
  const pathName = usePathname();
  const pathSegments = pathName.split("/");

  return pathSegments[4] === "repo_inspection";
};
