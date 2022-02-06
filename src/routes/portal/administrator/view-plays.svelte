<script>
  import { onMount } from "svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { pageTitle, plays } from "$lib/stores";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import { goto } from "$app/navigation";

  let loading = true;
  onMount(() => {
    $pageTitle = "View Plays";
    loading = false;
  });
  // const searchOptions = {
  //   query: "",
  //   sortBy: "",
  //   toneFilter: "",
  //   genderFilter: "",
  // };
  // const filterPlays = (options) => {
  //   let filteredPlays = $plays; //default

  //   if (options.toneFilter !== "") {
  //     filteredPlays = filteredPlays.filter((play) => play.tone.toLowerCase() == options.toneFilter);
  //   }
  //   if (options.genderFilter !== "") {
  //     filteredPlays = filteredPlays.filter((play) => play.authorGender.toLowerCase() == options.genderFilter);
  //   }
  //   if (options.query !== "") {
  //     filteredPlays = filteredPlays.filter((play) =>
  //       play.title.toLowerCase().replaceAll(" ", "").includes(options.query.toLowerCase().replaceAll(" ", ""))
  //     );
  //     let sortQueryRegex = new RegExp(`^(${options.query.toLowerCase().replaceAll(" ", "")})`);
  //     filteredPlays.sort((first, second) => {
  //       if (sortQueryRegex.test(first.title.toLowerCase().replaceAll(" ", ""))) {
  //         return -1;
  //       } else {
  //         return 1;
  //       }
  //     });
  //   }
  //   return filteredPlays;
  // };
  // $: $plays = filterPlays(searchOptions);
</script>

<!-- <div id="viewplays-toolbar">
  <label>Search: <input class="search-bar" type="search" bind:value={searchOptions.query} /></label>
  <label for="sort">Sort By:</label>
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
  </select>
  <label for="genderFilter">Gender:</label>
  <select class="dropdown" name="genderFilter" id="genderFilter" bind:value={searchOptions.genderFilter}>
    <option />
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div> -->
<DataTable stickyHeader table$aria-label="View Plays" style="width: 100%; height: 100%;">
  <Head>
    <Row>
      <Cell>Title</Cell>
      <Cell>Rating</Cell>
      <Cell>Tone</Cell>
      <Cell>Actors</Cell>
      <Cell>Pages</Cell>
      <Cell>Author</Cell>
    </Row>
  </Head>
  <Body>
    {#each $plays as play}
      <Row on:click={() => goto(`${play.id}-profile`)}>
        <Cell>{play.title}</Cell>
        <Cell>{play.rating}/10</Cell>
        <Cell>{play.tone}</Cell>
        <Cell>{play.actorCount}</Cell>
        <Cell>{play.pages}</Cell>
        <Cell>{play.authorName}</Cell>
      </Row>
    {/each}
  </Body>
</DataTable>
