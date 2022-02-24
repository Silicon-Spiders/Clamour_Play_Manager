<script>
  import { pageTitle, sideProfile } from "$lib/stores";
  import { onMount } from "svelte";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import Button, { Label } from "@smui/button";

  let evaluators = [];
  onMount(async () => {
    $pageTitle = "Manage Evaluators";
    const res = await fetch("../../server/admin/manage.json", {
      method: "GET",
    });
    const data = await res.json();
    evaluators = data.evaluators;
    return;
  });
</script>

<Button
  style="float: right"
  variant="outlined"
  on:click={() => {
    console.log("sd");
  }}
>
  <Label>Add Evaluator</Label>
</Button>
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
        <Cell>{evaluator.email}</Cell>
        <Cell>{evaluator.phone}</Cell>
        <Cell>
          <Button variant="outlined">Edit</Button>
        </Cell>
      </Row>
    {/each}
  </Body>
</DataTable>

<style>
  main {
    display: flex;
    column-gap: 2%;
  }

  .evaluators {
    flex-grow: 3;
    display: inline-block;
    max-height: 80vh;
    overflow: auto;
    transition: all 0.25s ease;
  }
</style>
