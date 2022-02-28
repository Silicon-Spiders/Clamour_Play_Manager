<script>
  import { pageTitle, plays } from "$lib/stores";
  import Textfield from "@smui/textfield";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";

  const searchOptions = {
    query: "",
    sortBy: "",
    toneFilter: "",
    genderFilter: "",
  };
  const filterPlays = (options) => {
    let filteredPlays = $plays; //default

    if (options.toneFilter !== "") {
      filteredPlays = filteredPlays.filter((play) => play.tone.toLowerCase() == options.toneFilter);
    }

    if (options.query !== "") {
      filteredPlays = filteredPlays.filter((play) =>
        play.title.toLowerCase().replaceAll(" ", "").includes(options.query.toLowerCase().replaceAll(" ", ""))
      );
      let sortQueryRegex = new RegExp(`^(${options.query.toLowerCase().replaceAll(" ", "")})`);
      filteredPlays.sort((first, second) => {
        if (sortQueryRegex.test(first.title.toLowerCase().replaceAll(" ", ""))) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    return filteredPlays;
  };
  $: $plays = filterPlays(searchOptions);
</script>

<Title>
  {$pageTitle}
</Title>
{#if $pageTitle === "View Plays"}
  <!-- <Textfield
    style="background-color: white; max-width: 25%;"
    label="Search Plays..."
    bind:value={searchOptions.query}
  /> -->
  <!-- <label for="sort">Sort By:</label>
    <select class="dropdown" name="sortBy" id="sort" bind:value={searchOptions.sortBy}>
      <option />
      <option value="ratingHL">Rating: High to Low</option>
      <option value="ratingLH">Rating: Low to High</option>
      <option value="actorsHL">Actors: High to Low</option>
      <option value="actorsLH">Actors: Low to High</option>
      <option value="pagesHL">Pages: High to Low</option>
      <option value="pagesLH">Pages: Low to High</option>
    </select>
    <label for="toneFilter">Tone:</label>
    <select class="dropdown" name="toneFilter" id="tone" bind:value={searchOptions.toneFilter}>
      <option />
      <option value="comedy">Comedy</option>
      <option value="drama">Drama</option>
    </select> -->
{/if}
