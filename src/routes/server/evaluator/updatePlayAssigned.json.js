import { updatePlayAssigned } from '$lib/dbFunctions';


export async function get(id) {

    updatePlayAssigned(id);

    return { 
        status:200,
     }
}