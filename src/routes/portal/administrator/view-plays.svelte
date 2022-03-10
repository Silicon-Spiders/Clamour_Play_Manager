<script>
  import { onMount } from "svelte";
  import { pageTitle, plays } from "$lib/stores";
  import DataTable, { Head, Body, Row, Cell as DCell, Pagination, SortValue } from "@smui/data-table";
  import { goto } from "$app/navigation";
  import IconButton from "@smui/icon-button";
  import Select, { Option } from "@smui/select";
  import Textfield from "@smui/textfield";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Icon, Label } from "@smui/button";

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

  let sort = "name";
  let sortDirection = "ascending";

  function handleSort() {
    $plays.sort((a, b) => {
      // console.log(sort);
      // console.log(sortDirection);
      const [aVal, bVal] = [a[sort], b[sort]][sortDirection === "ascending" ? "slice" : "reverse"]();
      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal);
      }
      return Number(aVal) - Number(bVal);
    });
    // console.log($plays);
    $plays = $plays;
  }
  let search = "";
  let searchField = "Title";
  const handleSearch = () => {
    if (search.length == 0) return;
    let sortQueryRegex = new RegExp(`^(${search.toLowerCase().replaceAll(" ", "")})`);
    const field = searchField == "Title" ? "title" : "author";
    $plays.sort((first) => {
      if (first[field].toLowerCase().replaceAll(" ", "").includes(search.toLowerCase().replaceAll(" ", ""))) {
        return -1;
      } else {
        return 1;
      }
    });
    $plays = $plays;
    $plays.sort((first) => {
      if (sortQueryRegex.test(first[field].toLowerCase().replaceAll(" ", ""))) {
        return -1;
      } else {
        return 1;
      }
    });
    $plays = $plays;
  };
  $: console.log($plays);
</script>

<!-- NEEDS NEW PLAYS AND BETTER TESTING -->

<LayoutGrid style="padding-inline:0px">
  <Cell span={2}>
    <Select variant="outlined" label="Search Field" bind:value={searchField}>
      <Option value="Title">Title</Option>
      <Option value="Author">Author</Option>
    </Select>
  </Cell>
  <Cell span={4}>
    <Textfield
      label="Search for {searchField}"
      variant="outlined"
      type="search"
      bind:value={search}
      on:input={handleSearch}
    >
      <Icon style="padding-left: 10px;" class="material-icons" slot="leadingIcon">search</Icon>
    </Textfield>
  </Cell>
  <Cell span={6} />
</LayoutGrid>
<DataTable
  stickyHeader
  table$aria-label="View Plays"
  style="width: 100%; height: 100%;"
  sortable
  bind:sort
  bind:sortDirection
  on:SMUIDataTable:sorted={handleSort}
>
  <Head>
    <Row>
      <DCell style="width:35%" columnId="title">
        <Label>Title</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </DCell>
      <DCell columnId="author">
        <Label>Author</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </DCell>
      <DCell columnId="rating">
        <Label>Rating</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </DCell>
      <DCell columnId="tone">
        <Label>Tone</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </DCell>
      <DCell columnId="actorCount">
        <Label>Actors</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </DCell>
      <DCell columnId="pages">
        <Label>Pages</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </DCell>
    </Row>
  </Head>
  <Body>
    {#each slice as play}
      <Row on:click={() => goto(`${play.id}-profile`)}>
        <DCell>{play.title}</DCell>
        <DCell>{play.author}</DCell>
        <DCell>{play.rating}/10</DCell>
        <DCell>{play.tone}</DCell>
        <DCell>{play.actorCount}</DCell>
        <DCell>{play.pages}</DCell>
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
