import { cloneRepo, createOrCheckoutBranch } from './gitUtils.js';

export function gitWorker(inputJson) {
  const { repoUrl, ticketId } = inputJson;

  if (!repoUrl || !ticketId) {
    throw new Error("repoUrl and ticketId are required");
  }

  const repoPath = cloneRepo(repoUrl);

  const branchName = `feature/${ticketId}`;
  createOrCheckoutBranch(branchName, repoPath);

  return {
    status: "success",
    message: "Repo ready and branch created",
    repoPath,
    branchName
  };
}