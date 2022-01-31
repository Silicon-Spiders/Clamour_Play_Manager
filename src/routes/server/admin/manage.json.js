import { addEvaluator, updateEvaluator, getEvaluators } from "$lib/dbFunctions";

export async function get() {

    const evaluators = await getEvaluators();
    return {
      body: { evaluators },
    }
  }