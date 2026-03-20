import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// 👉 Extract repo name
function getRepoName(repoUrl) {
  return repoUrl.split('/').pop().replace('.git', '');
}

// 👉 Clone repo (single clone logic)
export function cloneRepo(repoUrl) {
  const repoName = getRepoName(repoUrl);
  const workspacePath = path.join("workspace", repoName);

  if (fs.existsSync(workspacePath)) {
    console.log("Repo already cloned. Skipping clone.");
    return workspacePath;
  }

  console.log("Cloning repo...");

  fs.mkdirSync(workspacePath, { recursive: true });

  const result = spawnSync('git', ['clone', repoUrl, '.'], {
    cwd: workspacePath,
    stdio: 'inherit'
  });

  if (result.status !== 0) {
    throw new Error("Clone failed");
  }

  console.log("Clone successful");

  return workspacePath;
}

// 👉 CREATE / SWITCH BRANCH (THIS WAS MISSING)
export function createOrCheckoutBranch(branchName, repoPath) {
  console.log("Creating/Checking out branch:", branchName);

  const result = spawnSync('git', ['checkout', '-b', branchName], {
    cwd: repoPath,
    stdio: 'inherit'
  });

  if (result.status !== 0) {
    // If branch already exists → switch
    spawnSync('git', ['checkout', branchName], {
      cwd: repoPath,
      stdio: 'inherit'
    });
  }
}