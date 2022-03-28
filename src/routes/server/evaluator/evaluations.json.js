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
    console.log(`Evaluations hook request is --> ${res}`);
    return {};
};

 export async function get() {

    let evaluations = await getEvaluations();

    return {
        body:evaluations,
    }
};