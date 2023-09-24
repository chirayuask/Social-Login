import { secretKeys } from "../config/secretKeys.js";
import { getAccessToken, getGithubUserDetails } from "../repository/github.js";

export async function login(req, res) {
  try {
    let url = `https://github.com/login/oauth/authorize?scope=${secretKeys.GITHUB_SCOPE}&client_id=${secretKeys.GITHUB_CLIENT_ID}`;
    return res.redirect(url);
  } catch (error) {
    throw error;
  }
}

export async function callback(req, res) {
  try {
    let githubToken = "";
    if (req.query?.code) githubToken = await getAccessToken(req.query.code);
    let userDetails = "";
    if (githubToken?.access_token)
      userDetails = await getGithubUserDetails(githubToken.access_token);

    return res.json({
      query: req.query,
      body: req.body,
      githubToken,
      userDetails,
      headers: req.headers,
    });
  } catch (error) {
    throw error;
  }
}
