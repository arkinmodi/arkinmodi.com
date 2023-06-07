import type { Endpoints } from "@octokit/types";

export type GetRepositoryMetadataInput = {
  owner: string;
  repo: string;
  displayName: string;
};

export type RepositoryMetadata = {
  url: string;
  homepage: string;
  displayName: string;
  description: string;
};

type GetRepoResponseData =
  Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

export const getRepositoriesMetadata: (
  repos: GetRepositoryMetadataInput[],
) => Promise<RepositoryMetadata[]> = async (repositories) => {
  const allRepoMetadata: RepositoryMetadata[] = [];

  for (const repo of repositories) {
    const repoMetadata = await getRepo(repo.owner, repo.repo);
    allRepoMetadata.push({
      url: repoMetadata.html_url,
      homepage: repoMetadata.homepage!,
      displayName: repo.displayName,
      description: repoMetadata.description!,
    });
  }

  return allRepoMetadata;
};

const getRepo: (
  owner: string,
  repo: string,
) => Promise<GetRepoResponseData> = async (owner, repo) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  const data: GetRepoResponseData = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(
      new Error(
        `Failed to get ${owner}/${repo}. Status: ${response.status} ${
          response.statusText
        }. Body: ${JSON.stringify(data)}`,
      ),
    );
  }
};
