import { addEvaluator, updateEvaluator, getEvaluators } from "$lib/dbFunctions";

export async function get() {
  const evaluators = await getEvaluators();
  return {
    body: { evaluators },
  };
}

export async function post({ params, request }) {
  const body = await request.json();
  const res = await addEvaluator(body);
  if (res.acknowledged) {
    return {
      status: 200,
    };
  } else {
    return {
      status: 400,
    };
  }
}

export async function put({ params, request }) {
  const evalData = await request.json();
  console.log("THISS", evalData);
  const res = await updateEvaluator(evalData);
  const response = await res;
  console.log(response);
  if (response.acknowledged == true && response.modifiedCount === 1) {
    return {
      status: 200,
    };
  } else {
    return {
      status: 500,
    };
  }
}
