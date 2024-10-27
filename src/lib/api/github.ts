import { Octokit } from "@octokit/rest";

export async function getRepositories(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken });

  try {
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
    throw error;
  }
}

export async function getRepositoryContents(
  accessToken: string,
  owner: string,
  repo: string,
  path: string = ""
) {
  const octokit = new Octokit({ auth: accessToken });
  try {
    const encodedPath = path.split("/").map(encodeURIComponent).join("/");
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: encodedPath,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFileContent(
  accessToken: string,
  owner: string,
  repo: string,
  path: string
) {
  const octokit = new Octokit({ auth: accessToken });
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
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.type === "file") {
      return response.data;
    } else {
      throw new Error("Unexpected content type");
    }
  } catch (error) {
    console.error("Error fetching file content:", error);
    throw error;
  }
}