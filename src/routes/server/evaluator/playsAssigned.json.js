import {getPlaysAssigned} from '$lib/dbFunctions'

export async function get(username) {

    // console.log(username);
    
    let urlParam = username.url.search;
    const paramValue = urlParam.substring(urlParam.indexOf('=') + 1);
    console.log(paramValue);

    let playsAssigned = await getPlaysAssigned(paramValue);
    // console.log(playsAssigned);

    return {
        body:[playsAssigned],
    }
};
