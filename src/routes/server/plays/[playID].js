import { Headers } from "@sveltejs/kit/install-fetch";
import fs from "fs";

import { getPlayLocation } from "$lib/dbFunctions";
import * as GoogleDriveService from '$lib/api-functions/googleDriveService';

export async function get({params}) {
  let { gDrive } = await getPlayLocation(params.playID)
  let stream = await GoogleDriveService.getFile(gDrive);
  let name = "play.pdf";

  name = encodeURIComponent(name);

  let header = new Headers({
    'Content-disposition':'inline; filename="' + name + '"',
    'Content-type':'application/pdf'
  });

  let body = new Uint8Array(stream);
  
  return {
    status: 200,
    header,
    body
  }
}