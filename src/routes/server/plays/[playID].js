import { getPlayLocation } from "$lib/dbFunctions";
import { Headers } from "@sveltejs/kit/install-fetch";
import fs from "fs";

export async function get({params}) {
    let { filename } = await getPlayLocation(params.playID)

    let stream = fs.readFileSync(filename+".pdf", {encoding: ""});
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