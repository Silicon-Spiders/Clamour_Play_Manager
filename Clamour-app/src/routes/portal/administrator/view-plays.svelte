<script>
  import PlayHeading from "$lib/components/playheading.svelte";
  import Play from "$lib/components/play.svelte";
  import { dummyPlays } from "$lib/dummyData";
  let plays = dummyPlays;
  const searchOptions = {
    query: "",
    sortBy: "",
    toneFilter: "",
    genderFilter: "",
  };
  const filterPlays = (options) => {
    let filteredPlays = dummyPlays; //default

    if (options.toneFilter !== "") {
      filteredPlays = filteredPlays.filter(
        (play) => play.tone.toLowerCase() == options.toneFilter
      );
    }
    if (options.genderFilter !== "") {
      filteredPlays = filteredPlays.filter(
        (play) => play.authorGender.toLowerCase() == options.genderFilter
      );
    }
    if (options.query !== "") {
      filteredPlays = filteredPlays.filter((play) =>
        play.title
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(options.query.toLowerCase().replaceAll(" ", ""))
      );
      let sortQueryRegex = new RegExp(
        `^(${options.query.toLowerCase().replaceAll(" ", "")})`
      );
      filteredPlays.sort((first, second) => {
        console.log(first.title.toLowerCase().replaceAll(" ", ""));
        if (
          sortQueryRegex.test(first.title.toLowerCase().replaceAll(" ", ""))
        ) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    return filteredPlays;
  };
  $: plays = filterPlays(searchOptions);
</script>

<svelte:head>
  <title>Admin Menu</title>
</svelte:head>

<h1 class="header">View Plays ({plays.length} Submissions found)</h1>

<div id="viewplays-toolbar">
  <label
    >Search: <input
      class="search-bar"
      type="search"
      bind:value={searchOptions.query}
    /></label
  >
  <label for="sort">Sort By:</label>
  <select
    class="dropdown"
    name="sortBy"
    id="sort"
    bind:value={searchOptions.sortBy}
  >
    <option />
    <option value="ratingHL">Rating: High to Low</option>
    <option value="ratingLH">Rating: Low to High</option>
    <option value="actorsHL">Actors: High to Low</option>
    <option value="actorsLH">Actors: Low to High</option>
    <option value="pagesHL">Pages: High to Low</option>
    <option value="pagesLH">Pages: Low to High</option>
  </select>
  <label for="toneFilter">Tone:</label>
  <select
    class="dropdown"
    name="toneFilter"
    id="tone"
    bind:value={searchOptions.toneFilter}
  >
    <option />
    <option value="comedy">Comedy</option>
    <option value="drama">Drama</option>
  </select>
  <label for="genderFilter">Gender:</label>
  <select
    class="dropdown"
    name="genderFilter"
    id="genderFilter"
    bind:value={searchOptions.genderFilter}
  >
    <option />
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>

<PlayHeading />
<div class="viewplays-container">
  {#each plays as play}
    <Play {play} />
  {/each}
</div>

<style>
  .viewplays-container {
    max-height: 75%;
    overflow-y: scroll;
  }
</style>
