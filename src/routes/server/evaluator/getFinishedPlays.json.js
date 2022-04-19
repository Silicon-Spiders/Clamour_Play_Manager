import { getFinishedPlays } from '$lib/dbFunctions';


export async function get(username) {
    
    let urlParam = username.url.search;
    const paramValue = urlParam.substring(urlParam.indexOf('=') + 1);
    // console.log(paramValue);

    let playsAssigned = await getFinishedPlays(paramValue);

    return {
        body:[playsAssigned],
    }
};