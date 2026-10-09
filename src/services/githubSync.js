/**
 * GitHub API sync service to directly commit portfolio data updates to GitHub repository.
 */

const REPO_OWNER = 'Pranav-Kaushik008';
const REPO_NAME = 'Pranav-Kaushik-portfolio';
const GITHUB_API_BASE = 'https://api.github.com';

// Utility to convert unicode string to base64
function utf8ToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

// Fetch current SHA of a file from GitHub repository
export async function getFileSha(filePath, token) {
  try {
    const res = await fetch(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (res.status === 404) return null; // File doesn't exist yet
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to fetch file SHA');
    }

    const data = await res.json();
    return data.sha;
  } catch (error) {
    console.error(`Error fetching SHA for ${filePath}:`, error);
    throw error;
  }
}

// Commit and push a single file to GitHub
export async function commitFileToGitHub({ filePath, content, isBinary = false, commitMessage, token }) {
  const sha = await getFileSha(filePath, token);
  const base64Content = isBinary ? content : utf8ToBase64(content);

  const payload = {
    message: commitMessage || `Update ${filePath} via Portfolio Admin Dashboard`,
    content: base64Content,
    branch: 'main',
  };

  if (sha) {
    payload.sha = sha;
  }

  const res = await fetch(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || `Failed to update ${filePath}`);
  }

  return await res.json();
}

// Test if provided GitHub Token has write access to the repository
export async function testGitHubAuth(token) {
  if (!token || !token.trim()) throw new Error('GitHub token is required');

  const res = await fetch(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`, {
    headers: {
      Authorization: `token ${token.trim()}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error('Invalid GitHub Token');
    if (res.status === 404) throw new Error('Repository not found or token lacks permissions');
    const err = await res.json();
    throw new Error(err.message || 'Authentication test failed');
  }

  const repo = await res.json();
  if (!repo.permissions || !repo.permissions.push) {
    throw new Error('This token does not have write/push permissions to this repository');
  }

  return repo;
}
