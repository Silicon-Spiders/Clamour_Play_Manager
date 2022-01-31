import { getPlays } from "$lib/dbFunctions";

export async function get() {
  const plays = await getPlays();
  return {
    body: plays,
  };
}
