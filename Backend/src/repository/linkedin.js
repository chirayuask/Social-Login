import { secretKeys } from "../config/secretKeys.js";
import https from "https";
import axios from "axios";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from 'fs';

export const getAccessToken = async (authorization_code) => {
  try {
    let config = {
      method: "post",
      url: `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=${secretKeys.linkedin_client_id}&client_secret=${secretKeys.linkedin_client_secret}&code=${authorization_code}&redirect_uri=${secretKeys.linkedin_redirect_uri}`,
      headers: {
        "Content-Type": "application/json",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    };
    let { data } = await axios.request(config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (access_token) => {
  try {
      let accessConfig = {
          method: 'get',
          url: `https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,publicProfileUrl,profilePicture(displayImage~:playableStreams))`,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
          },
          httpsAgent: new https.Agent({
              rejectUnauthorized: false
          })
      };
      const userInfo = await axios.request(accessConfig);
      const emailAddress = await getEmailAddress(access_token);
      let imageUrl = userInfo.data.profilePicture['displayImage~'].elements[3].identifiers[0].identifier;
      let filepath = path.join(__dirname, `../profilepictures/images/${userInfo.data.id}.jpg`);
      let ifexists = fs.existsSync(filepath);
      if (ifexists) return { userInfo: userInfo.data, emailAddress };
      else {
          await downloadImage(imageUrl, filepath)
      };
      return { userInfo: userInfo.data, emailAddress };
  } catch (error) {
      throw error;
  }
}

export const getEmailAddress = async (access_token) => {
  try {
      let accessConfig = {
          method: 'get',
          url: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
          },
          httpsAgent: new https.Agent({
              rejectUnauthorized: false
          })
      }
      const userInfo = await axios.request(accessConfig);

      return userInfo.data?.elements[0]['handle~']?.emailAddress
  } catch (error) {
      throw error
  }
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
      https.get(url, (res) => {
          if (res.statusCode === 200) {
              res.pipe(fs.createWriteStream(filepath))
                  .on('error', reject)
                  .once('close', () => resolve(filepath));
          } else {
              // Consume response data to free up memory
              res.resume();
              reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

          }
      });
  });
}

