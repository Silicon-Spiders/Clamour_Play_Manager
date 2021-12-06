import { v4 } from "uuid";
import fs from "fs";

import config from "$lib/config";
import { dirname } from "path";

export async function post(req) {
  console.log("body.length", req.body.length);
  console.log("body", req.body);
  // see: https://stackoverflow.com/questions/31581254/how-to-write-a-file-from-an-arraybuffer-in-js/46779188
  // chunk is the Uint8Array object
  const id = v4();
  const path = `./${config.uploadDir}/${id}.pdf`;
  const returnPath = `/${id}.pdf`
  fs.writeFileSync(path, req.body);
  return {
    body: {
      path: returnPath
    }
  };
}