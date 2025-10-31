import type { VercelRequest, VercelResponse } from "@vercel/node";

// These will be your Vercel Environment Variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO_SLUG = process.env.GITHUB_REPO_SLUG; // e.g., "PranavS1604/medport-craft"
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const FILE_PATH = "public/content.json";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Only POST requests allowed" });
  }

  const { password, content } = request.body;

  // 1. Authenticate
  if (password !== ADMIN_PASSWORD) {
    return response.status(401).json({ message: "Invalid password" });
  }

  // 2. Check for required variables
  if (!GITHUB_TOKEN || !GITHUB_REPO_SLUG) {
    return response
      .status(500)
      .json({ message: "Server configuration error" });
  }

  const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO_SLUG}/contents/${FILE_PATH}`;

  try {
    // We must first get the current file's SHA to update it
    const getFileResponse = await fetch(GITHUB_API_URL, {
      method: "GET",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "User-Agent": "Vercel-Serverless-Function",
      },
    });

    if (!getFileResponse.ok) {
      throw new Error("Failed to fetch current file from GitHub");
    }

    const fileData = await getFileResponse.json();
    const currentSha = fileData.sha;

    // 3. Prepare the new content
    const newContentString = JSON.stringify(content, null, 2);
    // GitHub API requires content to be Base64 encoded
    const newContentBase64 = Buffer.from(newContentString).toString("base64");

    // 4. Commit the update
    const updateResponse = await fetch(GITHUB_API_URL, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "Vercel-Serverless-Function",
      },
      body: JSON.stringify({
        message: "feat: update portfolio content via admin panel",
        content: newContentBase64,
        sha: currentSha, // Provide the current SHA
        branch: GITHUB_BRANCH,
      }),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error("GitHub API Error:", errorData);
      throw new Error("Failed to commit file to GitHub");
    }

    return response.status(200).json({
      message: "Content updated successfully. Redeployment triggered.",
    });
  } catch (error: any) {
    console.error(error);
    return response
      .status(500)
      .json({ message: error.message || "An internal error occurred" });
  }
}
