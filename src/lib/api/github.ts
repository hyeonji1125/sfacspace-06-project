import { Octokit } from "@octokit/rest";

export async function getRepositories(accessToken: string) {
  console.log("Access Token:", accessToken.substring(0, 10) + "...");
  const octokit = new Octokit({ auth: accessToken });

  const { data: user } = await octokit.rest.users.getAuthenticated();
  console.log("Authenticated user:", user.login);

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
