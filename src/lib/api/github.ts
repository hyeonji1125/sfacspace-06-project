import { Octokit } from "@octokit/rest";

export async function getRepositories(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken });
  const { data: user } = await octokit.rest.users.getAuthenticated();
  try {
    const publicRepos = await octokit.paginate(
      octokit.rest.repos.listForAuthenticatedUser,
      {
        visibility: "public",
        sort: "updated",
        per_page: 100,
      },
    );
    console.log("Public repos count:", publicRepos.length);
    const privateRepos = await octokit.paginate(
      octokit.rest.repos.listForAuthenticatedUser,
      {
        visibility: "private",
        sort: "updated",
        per_page: 100,
      },
    );
    console.log("Private repos count:", privateRepos.length);
    const allRepos = [...publicRepos, ...privateRepos].sort((a, b) => {
      const dateA = a.updated_at ? new Date(a.updated_at) : new Date(0);
      const dateB = b.updated_at ? new Date(b.updated_at) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
    console.log("레퍼지토리 전체 목록", allRepos);
    return allRepos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}

export async function getRepositoryContents(
  accessToken: string,
  owner: string,
  repo: string,
  path: string = "",
) {
  const octokit = new Octokit({ auth: accessToken });
  try {
    console.log(`Fetching contents for ${owner}/${repo}, path: ${path}`);
    const encodedPath = path.split("/").map(encodeURIComponent).join("/");
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: encodedPath,
    });
    console.log("Content fetched successfully");
    return response.data;
  } catch (error) {
    console.error("Error fetching repository contents:", error);
    throw error;
  }
}

export async function getFileContent(
  accessToken: string,
  owner: string,
  repo: string,
  path: string,
) {
  const octokit = new Octokit({ auth: accessToken });
  try {
    console.log(`Fetching file content for ${owner}/${repo}, path: ${path}`);
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
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (Array.isArray(response.data)) {
      console.log("Received directory listing instead of file content");
      return response.data;
    } else if (response.data.type === "file") {
      console.log("File content fetched successfully");
      return response.data;
    } else {
      throw new Error("Unexpected content type");
    }
  } catch (error) {
    console.error("Error fetching file content:", error);
    throw error;
  }
}
