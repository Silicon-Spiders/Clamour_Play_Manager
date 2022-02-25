<script>
  import { pageTitle, sideProfile } from "$lib/stores";
  import { onMount } from "svelte";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import Button, { Label } from "@smui/button";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Textfield from "@smui/textfield";
  import LayoutGrid from "@smui/layout-grid";
  import IconButton from "@smui/icon-button";

  let evaluators = [];
  onMount(async () => {
    $pageTitle = "Manage Evaluators";
    const res = await fetch("../../server/admin/manage.json", {
      method: "GET",
    });
    const data = await res.json();
    evaluators = data.evaluators;
  });
  let openEvaluatorCreator = false;
  let addEvaluatorForm = {
    id: "",
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
</script>

<Button
  style="float: right"
  variant="outlined"
  on:click={() => {
    openEvaluatorCreator = true;
  }}
>
  <Label>Add Evaluator</Label>
</Button>
<Dialog scrimClickAction="" escapeKeyAction="" bind:open={openEvaluatorCreator}>
  <Title>Add Evaluator</Title>
  <Content>
    <form class="add-evaluator" on:submit={submitEvaluator}>
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
      <Row on:click={() => ($sideProfile = evaluator)}>
        <Cell>{evaluator.firstName} {evaluator.lastName}</Cell>
        <Cell><a href="mailto:{evaluator.email}">{evaluator.email}</a></Cell>
        <Cell><a href="tel:{evaluator.phone}">{evaluator.phone}</a></Cell>
        <Cell><Button variant="outlined">Edit</Button></Cell>
      </Row>
    {/each}
  </Body>
</DataTable>

<style>
  :global(.add-evaluator) {
    display: flex;
    row-gap: 10px;
    flex-direction: column;
  }
</style>
