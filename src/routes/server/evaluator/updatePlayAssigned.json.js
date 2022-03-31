import { updatePlayAssigned } from '$lib/dbFunctions';


// export async function get(id) {

//     updatePlayAssigned(id);

//     return { 
//         status:200,
//      }
// }

export async function get(id) {

    let urlParam = id.url;
    console.log(`middleware of update is --> ${urlParam}`);
    urlParam = String(urlParam);
    const idParam = urlParam.substring(urlParam.indexOf('=') + 1 , urlParam.indexOf('&'));
    const usernameParam = urlParam.substring(urlParam.indexOf('&')).split('=')[1];

    console.log(`id in updatePlayAssigned middleware hook is : ${idParam} and username is ${usernameParam}`);
    updatePlayAssigned(idParam , usernameParam);

    return {
        status: 200,
    };
}