import { google } from "googleapis";
import { secretKeys } from "../config/secretKeys.js";
import { fetchUserDetails } from "../repository/google.js";
export async function login(req, res) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      secretKeys.GOOGLECLIENTID,
      secretKeys.GOOGLECLIENTSECRET,
      secretKeys.GOOGLEREDIRECTURL
    );

    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      include_granted_scopes: true,
    });
    console.log("authorizationUrl", authorizationUrl);
    return res.redirect(authorizationUrl);
  } catch (error) {
    throw error;
  }
}

export async function callback(req, res) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      secretKeys.GOOGLECLIENTID,
      secretKeys.GOOGLECLIENTSECRET,
      secretKeys.GOOGLEREDIRECTURL
    );
    oauth2Client.getToken(req.query.code, async function (err, tokens) {
      if (err) {
        console.log("Error authenticating", err);
      } else {
        const userDetails = await fetchUserDetails(tokens.access_token);

        return res.status(200).send(userDetails);
      }
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}
