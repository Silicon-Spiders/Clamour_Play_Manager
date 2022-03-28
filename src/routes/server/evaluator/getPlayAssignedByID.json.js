import { getPlayByID } from '$lib/dbFunctions';


export async function get(id) {

    console.log(`id in the hook middleware is --> ${id}`);
    let playAssigned = await getPlayByID(id);
    
    return {
        body:[playAssigned],
    }
}