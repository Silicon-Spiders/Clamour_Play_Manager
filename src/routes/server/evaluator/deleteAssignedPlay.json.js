import { deletePlayAssigned } from '$lib/dbFunctions';

export async function get(id) {


    console.log('THIS IS INSIDE deleteAssignedPlay.json with this being passed: ' + JSON.stringify(id));
    deletePlayAssigned(id);
    // console.log('IM INSIDE THE deleteAssignedPlay route with this being based into dbFunction: ' + req.body);

    return { 
        status:200,
     }
};