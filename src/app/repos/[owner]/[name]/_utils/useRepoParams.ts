import { useParams, useSearchParams } from "next/navigation";

export function useRepoParams() {
  const params = useParams();
  const fileParams = useSearchParams();

  // owner, name 값을 추출
  const owner = Array.isArray(params.owner) ? params.owner[0] : params.owner;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  return {
    owner,
    name,
  };
}
