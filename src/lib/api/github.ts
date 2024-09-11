import { Octokit } from "@octokit/rest";
import { RequestError } from "@octokit/request-error";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
  userAgent: "FlawDetector v1.0.0",
});

function isOctokitError(error: unknown): error is RequestError {
  return error instanceof Error && "status" in error && "response" in error;
}

/* 전체 레퍼지토리 조회 */
export async function getRepositories(
  accessToken: string,
): Promise<
  RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["response"]["data"]
> {
  try {
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log("Authenticated user:", user.login);

    const publicRepos = await octokit.paginate(
      octokit.rest.repos.listForAuthenticatedUser,
      {
        visibility: "public",
        sort: "updated",
        per_page: 100,
      },
    );

    const privateRepos = await octokit.paginate(
      octokit.rest.repos.listForAuthenticatedUser,
      {
        visibility: "private",
        sort: "updated",
        per_page: 100,
      },
    );

    const allRepos = [...publicRepos, ...privateRepos].sort((a, b) => {
      const dateA = a.updated_at ? new Date(a.updated_at) : new Date(0);
      const dateB = b.updated_at ? new Date(b.updated_at) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    return allRepos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    if (isOctokitError(error) && error.status === 403) {
      const rateLimit = error.response?.headers?.["x-ratelimit-remaining"];
      const rateLimitReset = error.response?.headers?.["x-ratelimit-reset"];
      if (rateLimit === "0" && rateLimitReset) {
        console.error(
          "API rate limit exceeded. Retry after:",
          new Date(Number(rateLimitReset) * 1000),
        );
      }
    }
    throw error;
  }
}

/* 특정 레퍼지토리 컨텐츠 조회 */
export async function getRepositoryContents(
  accessToken: string,
  owner: string,
  repo: string,
  path: string = "",
) {
  try {
    const encodedPath = path.split("/").map(encodeURIComponent).join("/");
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: encodedPath,
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repository contents:", error);
    throw error;
  }
}

/* 특정 파일 컨텐츠 조회 */
export async function getFileContent(
  accessToken: string,
  owner: string,
  repo: string,
  path: string,
) {
  try {
    const encodedPath = path
      .split("/")
      .map(encodeURIComponent)
      .join("/")
      .replace(/\/$/, "");
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: encodedPath,
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (Array.isArray(response.data)) return response.data;
    else if (response.data.type === "file") return response.data;
    else throw new Error("Unexpected content type");
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}
