<script>
  import { pageTitle, sideProfile } from "$lib/stores";
  import { onMount } from "svelte";
  import DataTable, { Head, Body, Row, Cell, Pagination } from "@smui/data-table";
  import Button, { Label } from "@smui/button";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Textfield from "@smui/textfield";
  import LayoutGrid from "@smui/layout-grid";
  import Select, { Option } from "@smui/select";

  import IconButton from "@smui/icon-button";

  let evaluators = [];
  onMount(async () => {
    $pageTitle = "Manage Evaluators";
    const res = await fetch("../../server/admin/manage.json", {
      method: "GET",
    });
    const data = await res.json();
    evaluators = data.evaluators;
    // console.log(evaluators);
  });

  // Add Evaluator
  let openEvaluatorCreator = false;
  let addEvaluatorForm = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  };
  const submitEvaluator = async (e) => {
    console.log({ addEvaluatorForm });
  };

  // Edit Evaluator
  let openEditEvaluatorForm = false;
  let editEvaluatorForm = {
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  };
  const submitEvaluatorEdit = async (e) => {
    console.log({ editEvaluatorForm });
  };

  let rowsPerPage = 10;
  let currentPage = 0;

  $: start = currentPage * rowsPerPage;
  $: end = Math.min(start + rowsPerPage, evaluators.length);
  $: slice = evaluators.slice(start, end);
  $: lastPage = Math.max(Math.ceil(evaluators.length / rowsPerPage) - 1, 0);

  $: if (currentPage > lastPage) {
    currentPage = lastPage;
  }
</script>

<Button variant="outlined" on:click={() => (openEvaluatorCreator = true)}>Add Evaluator</Button>
<!-- Add Evaluator -->
<Dialog scrimClickAction="" escapeKeyAction="" bind:open={openEvaluatorCreator}>
  <Title>Add Evaluator</Title>
  <Content>
    <form class="add-evaluator" on:submit|preventDefault={submitEvaluator}>
      <Textfield variant="outlined" label="First Name" bind:value={addEvaluatorForm.firstName} />
      <Textfield variant="outlined" label="Last Name" bind:value={addEvaluatorForm.lastName} />
      <Textfield variant="outlined" label="Email" bind:value={addEvaluatorForm.email} />
      <Textfield variant="outlined" label="Phone" bind:value={addEvaluatorForm.phone} />
      <Textfield variant="outlined" label="Username" bind:value={addEvaluatorForm.username} />
      <Textfield variant="outlined" label="Password" bind:value={addEvaluatorForm.password} />
      <Button variant="outlined" on:click$preventDefault={() => (openEvaluatorCreator = false)}>Cancel</Button
      >
      <Button variant="outlined" type="submit">Submit</Button>
    </form>
  </Content>
</Dialog>
<!-- Edit Evaluator -->
<Dialog scrimClickAction="" escapeKeyAction="" bind:open={openEditEvaluatorForm}>
  <Title>Edit Evaluator</Title>
  <Content>
    <form class="add-evaluator" on:submit|preventDefault={submitEvaluatorEdit}>
      <Textfield variant="outlined" label="First Name" bind:value={editEvaluatorForm.firstName} />
      <Textfield variant="outlined" label="Last Name" bind:value={editEvaluatorForm.lastName} />
      <Textfield variant="outlined" label="Email" bind:value={editEvaluatorForm.email} />
      <Textfield variant="outlined" label="Phone" bind:value={editEvaluatorForm.phone} />
      <Textfield variant="outlined" label="Username" bind:value={editEvaluatorForm.username} />
      <Textfield variant="outlined" label="Password" bind:value={editEvaluatorForm.password} />
      <Button
        variant="outlined"
        on:click$preventDefault={() => {
          Object.keys(editEvaluatorForm).forEach((key) => (editEvaluatorForm[key] = ""));
          openEditEvaluatorForm = false;
        }}>Cancel</Button
      >
      <Button variant="outlined" type="submit">Submit</Button>
    </form>
  </Content>
</Dialog>
<DataTable stickyHeader table$aria-label="Evaluators list" style="width: 100%;">
  <Head>
    <Row>
      <Cell>Name</Cell>
      <Cell>Email</Cell>
      <Cell>Phone Number</Cell>
      <Cell />
    </Row>
  </Head>
  <Body>
    {#each evaluators as evaluator}
      <Row>
        <Cell>{evaluator.firstName} {evaluator.lastName}</Cell>
        <Cell><a href="mailto:{evaluator.email}">{evaluator.email}</a></Cell>
        <Cell><a href="tel:{evaluator.phone}">{evaluator.phone}</a></Cell>
        <Cell
          ><Button
            variant="outlined"
            on:click={() => {
              editEvaluatorForm = {
                id: evaluator._id,
                firstName: evaluator.firstName,
                lastName: evaluator.lastName,
                email: evaluator.email,
                phone: evaluator.phone,
                username: "",
                password: "",
              };
              openEditEvaluatorForm = true;
              $sideProfile = evaluator;
            }}>Edit</Button
          ></Cell
        >
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
      {start + 1}-{end} of {evaluators.length}
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

<style>
  :global(.add-evaluator) {
    display: flex;
    row-gap: 3vh;
    flex-direction: column;
  }
</style>
