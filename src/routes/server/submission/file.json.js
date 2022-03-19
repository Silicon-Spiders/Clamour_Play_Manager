import { v4 } from "uuid";
import fs from "fs";
import path from 'path';
import os from 'os';

import config from "$lib/config";
import { extractFileContent } from "$lib/utils/io";

export async function post({params, request}) {
  let data = await request.formData();
  // see: https://stackoverflow.com/questions/31581254/how-to-write-a-file-from-an-arraybuffer-in-js/46779188
  // chunk is the Uint8Array object
  const id = v4();
  const loc = path.join(os.tmpdir(), id + '.pdf');
  const returnPath = `${id}.pdf`;
  const file = data.get("file");
  fs.writeFileSync(loc, await extractFileContent(file));
  return {
    body: {
      path: returnPath
    }
  };
}

