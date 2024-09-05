import { useParams, useSearchParams } from "next/navigation";

export function useRepoParams() {
  const params = useParams();
  const fileParams = useSearchParams();

  // owner, name, repoPath, filePath 값을 추출
  const owner = Array.isArray(params.owner) ? params.owner[0] : params.owner;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const repoPath = fileParams.get("repo");
  const filePath = fileParams.get("file");

  return {
    owner,
    name,
    repoPath,
    filePath,
  };
}
