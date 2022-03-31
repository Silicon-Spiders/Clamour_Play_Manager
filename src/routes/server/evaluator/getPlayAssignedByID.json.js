import { getPlayByID } from '$lib/dbFunctions';


export async function get(id) {

    let urlParam = id.url;
    urlParam = String(urlParam);
    const paramValue = urlParam.substring(urlParam.indexOf('=') + 1);

    let playAssigned = await getPlayByID(paramValue);
    
    return {
        body:[playAssigned],
    }
}