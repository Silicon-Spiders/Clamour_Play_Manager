import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { v4 } from "uuid";

const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || '';
const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || '';
const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || '';
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || '';

const oauth2Client = new google.auth.OAuth2(
  driveClientId,
  driveClientSecret,
  driveRedirectUri
);

oauth2Client.setCredentials({refresh_token: driveRefreshToken});

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

// takes in UUID filename in tmpdir and replace with fileName before upload
export async function saveFile(file, fileName) {
  try {
    const filePath = path.join(os.tmpdir(), file);
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: 'application/pdf'
      },
      media: {
        mimeType: 'application/json',
        body: fs.createReadStream(filePath)
      }
    });

    return response.data.id

  } catch (error) {
    console.log(error.message);
  }
}

export async function find(fileName) {
  try {
    let pageToken = null;

    let response = await drive.files.list({
      // q: `name='${fileName}'`,
      q: '"11kSjf97INhsgHyuNiXLIbv5BkSGIi7pq" in my-drive',
      fields: 'nextPageToken, files(id, name)',
      spaces: 'drive',
      pageToken
    })
    console.log(response.data.files);
  
  } catch (error) {
    console.log(error.message);
  }
}

export async function getFile(fileId) {
  try {
    let response = drive.files.get(
      {
        fileId,
        alt: 'media'
      },
      {
        responseType: 'stream'
      },
      (err, {data}) => {
        if (err) {
          console.log(err);
          return;
        }
        data
          .on("end", () => console.log("Done."))
          .on("error", (err) => {
            console.log(err);
            return process.exit();
          })
          .pipe(file);
      }
    )
  
  } catch (error) {
    console.log(error.message)
  }
}