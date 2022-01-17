import { getPlays, getEvaluatorsSanitized, assignPlays } from "$lib/dbFunctions";

export async function get() {
  const plays = await getPlays();
  const evaluators = await getEvaluatorsSanitized();
  return {
    body: { plays, evaluators },
  }
}

export async function post(req) {
  assignPlays(req.body);
  return {
    status: 200,
  }
}