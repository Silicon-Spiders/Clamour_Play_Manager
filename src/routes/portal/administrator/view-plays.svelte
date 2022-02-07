<script>
  import { onMount } from "svelte";
  import { pageTitle, plays } from "$lib/stores";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import { goto } from "$app/navigation";

  onMount(() => {
    $pageTitle = "View Plays";
  });
  
</script>

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
