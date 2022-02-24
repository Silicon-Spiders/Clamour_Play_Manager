import { getPlays, getEvaluatorsSanitized, assignPlays } from "$lib/dbFunctions";

export async function get() {
  const plays = await getPlays();
  const evaluators = await getEvaluatorsSanitized();
  return {
    body: { plays, evaluators },
  }
}

export async function post({params, request}) {
  let req = await request.json();
  assignPlays(req);
  return {
    status: 200,
  }
}