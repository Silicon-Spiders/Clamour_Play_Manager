import { addEvaluator, updateEvaluator, getEvaluators } from "$lib/dbFunctions";

export async function get() {
  const evaluators = await getEvaluators();
  return {
    body: { evaluators },
  };
}

export async function post(req) {
  addEvaluator(req.body);
  return {
    status: 200,
  };
}

export async function put(req) {
  const evalData = req.body;
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
