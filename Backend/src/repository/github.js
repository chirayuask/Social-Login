import axios from "axios";
import { secretKeys } from "../config/secretKeys.js";
import * as queryString from "query-string";

export const getAccessToken = async (code) => {
  try {
    const { data } = await axios({
      url: "https://github.com/login/oauth/access_token",
      method: "get",
      params: {
        client_id: secretKeys.GITHUB_CLIENT_ID,
        client_secret: secretKeys.GITHUB_CLIENT_SECRET,
        code,
      },
    });
    const parsedData = queryString.default.parse(data);
    return parsedData;
  } catch (error) {
    throw error;
  }
};

export const getGithubUserDetails = async (access_token) => {
  try {
    const { data } = await axios({
      url: "https://api.github.com/user",
      method: "get",
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
