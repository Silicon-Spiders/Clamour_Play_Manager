import { v4 } from "uuid";
import fs from "fs";

import config from "$lib/config";
import { extractFileContent } from "$lib/utils/io";

export async function post({params, request}) {
  let data = await request.formData();
  // see: https://stackoverflow.com/questions/31581254/how-to-write-a-file-from-an-arraybuffer-in-js/46779188
  // chunk is the Uint8Array object
  const id = v4();
  const path = `./${config.uploadDir}/${id}.pdf`;
  const returnPath = `/${id}.pdf`
  const file = data.get("file")
  fs.writeFileSync(path, await extractFileContent(file));
  return {
    body: {
      path: returnPath
    }
  };
}

