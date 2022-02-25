<script>
  import { onMount } from "svelte";
  import { pageTitle, plays } from "$lib/stores";
  import DataTable, { Head, Body, Row, Cell, Pagination } from "@smui/data-table";
  import { goto } from "$app/navigation";
  import IconButton from "@smui/icon-button";
  import Select, { Option } from "@smui/select";
  import { Label } from "@smui/common";

  onMount(() => {
    $pageTitle = "View Plays";
  });

  let rowsPerPage = 10;
  let currentPage = 0;

  $: start = currentPage * rowsPerPage;
  $: end = Math.min(start + rowsPerPage, $plays.length);
  $: slice = $plays.slice(start, end);
  $: lastPage = Math.max(Math.ceil($plays.length / rowsPerPage) - 1, 0);

  $: if (currentPage > lastPage) {
    currentPage = lastPage;
  }
</script>

<DataTable stickyHeader table$aria-label="View Plays" style="width: 100%; height: 100%;">
  <Head>
    <Row>
      <Cell style="width:35%">Title</Cell>
      <Cell>Rating</Cell>
      <Cell>Tone</Cell>
      <Cell>Actors</Cell>
      <Cell>Pages</Cell>
      <Cell>Author</Cell>
    </Row>
  </Head>
  <Body>
    {#each slice as play}
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
  <Pagination slot="paginate">
    <svelte:fragment slot="rowsPerPage">
      <Label>Rows Per Page</Label>
      <Select variant="outlined" bind:value={rowsPerPage} noLabel>
        <Option value={10}>10</Option>
        <Option value={25}>25</Option>
        <Option value={100}>100</Option>
      </Select>
    </svelte:fragment>
    <svelte:fragment slot="total">
      {start + 1}-{end} of {$plays.length}
    </svelte:fragment>
    <IconButton
      class="material-icons"
      action="first-page"
      title="First page"
      on:click={() => (currentPage = 0)}
      disabled={currentPage === 0}>first_page</IconButton
    >
    <IconButton
      class="material-icons"
      action="prev-page"
      title="Prev page"
      on:click={() => currentPage--}
      disabled={currentPage === 0}>chevron_left</IconButton
    >
    <IconButton
      class="material-icons"
      action="next-page"
      title="Next page"
      on:click={() => currentPage++}
      disabled={currentPage === lastPage}>chevron_right</IconButton
    >
    <IconButton
      class="material-icons"
      action="last-page"
      title="Last page"
      on:click={() => (currentPage = lastPage)}
      disabled={currentPage === lastPage}>last_page</IconButton
    >
  </Pagination>
</DataTable>
