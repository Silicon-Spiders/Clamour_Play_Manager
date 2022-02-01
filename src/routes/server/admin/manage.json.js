import { addEvaluator, updateEvaluator, getEvaluators } from "$lib/dbFunctions";

export async function get() {

    const evaluators = await getEvaluators();
    return {
      body: { evaluators },
    }
  }

export async function add(req) {

  addEvaluator(req.body)
  return {
    status: 200,
  }

}

export async function update() {

  updateEvaluator()

}