import { updatePlayAssigned } from '$lib/dbFunctions';


export async function get(id) {

    // console.log('INSIDE update ROUTE with id: ' + id);
    updatePlayAssigned(id);

    return { 
        status:200,
     }
}