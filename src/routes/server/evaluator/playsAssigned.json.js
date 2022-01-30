import {getPlaysAssigned} from '$lib/dbFunctions'

export async function get() {

    let playsAssigned = await getPlaysAssigned();
    // console.log(playsAssigned);

    return {
        body:[playsAssigned],
    }
};