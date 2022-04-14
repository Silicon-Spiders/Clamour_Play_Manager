import {insertEvaluation , getEvaluations} from '$lib/dbFunctions';

// export async function post(req) {

//     insertEvaluation(req.params);

//     return {
//         status:200,
//     }
// }

export const post = async ({request}) => {

    const res = await request.json();
    insertEvaluation(res);

    return {};
};

 export async function get(username) {

    let urlParam = username.url;
    urlParam = String(urlParam);
    const paramValue = urlParam.substring(urlParam.indexOf('=') + 1);

    let evaluations = await getEvaluations(paramValue);

    return {
        body:evaluations,
    }
};