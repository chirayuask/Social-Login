import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const secretKeys = {
  SERVER_PORT: process.env.SERVER_PORT,
  GOOGLECLIENTID: process.env.GOOGLECLIENTID,
  GOOGLECLIENTSECRET: process.env.GOOGLECLIENTSECRET,
  GOOGLEREDIRECTURL: process.env.GOOGLEREDIRECTURL,
  linkedin_client_id: process.env.linkedin_client_id,
  linkedin_client_secret: process.env.linkedin_client_secret,
  linkedin_scope: process.env.linkedin_scope,
  linkedin_state: process.env.linkedin_state,
  linkedin_redirect_uri: process.env.linkedin_redirect_uri,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_SCOPE: [
    "repo:status",
    "repo_deployment",
    "user:email",
    "user:follow",
    "read:project",
  ]
};
