import { evaluators, plays } from "$lib/stores";

/**
 * @async
 * @returns {Promise} Promise that resolves to array of plays
 */
export const updatePlays = async () => {
  const res = await fetch("../../server/admin/plays.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    let playsData = [];
    data.forEach((play) => {
      const {
        _id: id,
        title = "Unknown",
        rating = 0,
        tone = "Drama",
        actorCount = 0,
        author = "Unknown",
        length: pages = 0,
        synopsis = "None",
        dateOfSubmission = "Error",
        actexplain = "None",
      } = play;
      // console.log(play);
      // let authorName = `${firstName} ${lastName}`;
      // console.log(play);
      playsData = [
        ...playsData,
        {
          id,
          title,
          rating,
          tone,
          actorCount,
          pages,
          author,
          synopsis,
          dateOfSubmission,
          actexplain,
        },
      ];
    });
    plays.set(playsData);
    return playsData;
  } else {
    console.error("Something went wrong with updatePlays() ");
    return;
  }
};

export const updateEvaluators = async () => {
  const res = await fetch("../../server/admin/manage.json", {
    method: "GET",
  });
  const data = await res.json();
  evaluators.set(data.evaluators);
};
