import { getPlayByID } from '$lib/dbFunctions';


export async function get(id) {


    let playAssigned = await getPlayByID(id);
    //console.log(playAssigned);
    return {
        body:[playAssigned],
    }
}