import {insertEvaluation , getEvaluations} from '$lib/dbFunctions';

export async function post(req) {

     insertEvaluation(req.body);

    return {
        status:200,
    }
}

 export async function get() {

    let evaluations = await getEvaluations();
    // console.log(evaluations);

    return {
        body:evaluations,
    }
};