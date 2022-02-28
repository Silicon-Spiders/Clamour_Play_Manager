/**
 * @async
 * @returns {Promise} Promise that resolves to array of plays
 */
export const getPlays = async () => {
  const res = await fetch("../../server/admin/plays.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    let plays = [];
    data.forEach((play) => {
      const {
        _id: id,
        title = "Unknown",
        rating = 0,
        tone = "Drama",
        actorCount = 0,
        length: pages = 0,
        authorName = "Unknown",
        synopsis = "None",
        dateOfSubmission = "Error",
        actexplain = "None",
      } = play;
      // console.log(play);
      plays = [
        ...plays,
        {
          id,
          title,
          rating,
          tone,
          actorCount,
          pages,
          authorName,
          synopsis,
          dateOfSubmission,
          actexplain,
        },
      ];
    });
    return plays;
  } else {
    console.error("Something went wrong with getPlays() ");
    return;
  }
};
