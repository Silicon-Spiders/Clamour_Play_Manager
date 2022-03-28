import { getPlayByID } from '$lib/dbFunctions';


export async function get(id) {

    console.log(`id in the hook middleware is --> ${JSON.stringify(id)}`);
    let urlParam = id.url;
    console.log(`urlParam variable is equal to: ${urlParam}`);
    urlParam = String(urlParam);
    const paramValue = urlParam.substring(urlParam.indexOf('=') + 1);
    console.log(`id in hook middle after edit ISS: ${paramValue}`);

    let playAssigned = await getPlayByID(paramValue);
    
    return {
        body:[playAssigned],
    }
}