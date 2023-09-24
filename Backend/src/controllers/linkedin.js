import {
  getAccessToken,
  getEmailAddress,
  getUserInfo,
} from "../repository/linkedin.js";
import { secretKeys } from "../config/secretKeys.js";

export async function login(req, res) {
  try {
    let url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${secretKeys.linkedin_client_id}&scope=${secretKeys.linkedin_scope}&state=${secretKeys.linkedin_state}&redirect_uri=${secretKeys.linkedin_redirect_uri}`;
    return res.redirect(url);
  } catch (error) {
    throw error;
  }
}

export async function callback(req, res) {
  try {
    const getToken = await getAccessToken(req.query.code);
    console.log("getToken", getToken);
    const { emailAddress, userInfo } = await getUserInfo(getToken.access_token);

    return res
      .status(200)
      .send({ getToken, user_info: userInfo, email_address: emailAddress });
  } catch (error) {
    return res.status(500).send(error);
  }
}
