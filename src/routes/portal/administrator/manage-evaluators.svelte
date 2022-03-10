<script>
  import { evaluators, pageTitle, plays, sideProfile } from "$lib/stores";
  import { onMount } from "svelte";
  import DataTable, { Head, Body, Row, Cell as DCell, Pagination, SortValue } from "@smui/data-table";
  import Button, { Icon, Label } from "@smui/button";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Textfield from "@smui/textfield";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Select, { Option } from "@smui/select";

  import IconButton from "@smui/icon-button";
  import { updateEvaluators } from "$lib/api-functions/admin";
  import { alert } from "$lib/components/Alert.svelte";

  onMount(async () => {
    $pageTitle = "Manage Evaluators";
    await updateEvaluators();
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
    plays: {},
  };
  const submitEvaluator = async (e) => {
    console.log({ addEvaluatorForm });
    const res = await fetch(e.target.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addEvaluatorForm),
    });
    console.log(res);
    if (res.ok) {
      openEvaluatorCreator = false;
      await updateEvaluators();
    } else {
      alert.show("Unexpected Error in registering evaluator", "error");
    }
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
    const res = await fetch(e.target.action, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editEvaluatorForm),
    });
    if (res.ok) {
      openEditEvaluatorForm = false;
      await updateEvaluators();
    }
  };

  let rowsPerPage = 10;
  let currentPage = 0;

  $: start = currentPage * rowsPerPage;
  $: end = Math.min(start + rowsPerPage, $evaluators.length);
  $: slice = $evaluators.slice(start, end);
  $: lastPage = Math.max(Math.ceil($evaluators.length / rowsPerPage) - 1, 0);

  $: if (currentPage > lastPage) {
    currentPage = lastPage;
  }

  let sort = "name";
  let sortDirection = "ascending";

  function handleSort() {
    $evaluators.sort((a, b) => {
      const [aVal, bVal] = [a[sort], b[sort]][sortDirection === "ascending" ? "slice" : "reverse"]();
      console.log({ aVal, bVal });
      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal);
      }
      return Number(aVal) - Number(bVal);
    });
    $evaluators = $evaluators;
  }
  let search = "";
  const handleSearch = () => {
    if (search.length == 0) return;
    let sortQueryRegex = new RegExp(`^(${search.toLowerCase().replaceAll(" ", "")})`);
    $evaluators.sort((first) => {
      if (
        search.toLowerCase().replaceAll(" ", "").includes(first.firstName.toLowerCase().replaceAll(" ", ""))
      ) {
        return -1;
      } else {
        return 1;
      }
    });
    $evaluators = $evaluators;
    $evaluators.sort((first) => {
      if (sortQueryRegex.test(first.firstName.toLowerCase().replaceAll(" ", ""))) {
        return -1;
      } else {
        return 1;
      }
    });
    $evaluators = $evaluators;
  };
</script>

<!-- Add Evaluator -->
<Dialog scrimClickAction="" escapeKeyAction="" bind:open={openEvaluatorCreator}>
  <Title>Add Evaluator</Title>
  <Content>
    <form
      class="add-evaluator"
      on:submit|preventDefault={submitEvaluator}
      action="../../server/admin/manage.json"
    >
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
    <form
      class="add-evaluator"
      action="../../server/admin/manage.json"
      on:submit|preventDefault={submitEvaluatorEdit}
    >
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
<!-- Search -->
<LayoutGrid style="padding-inline:0px">
  <Cell span={4}>
    <Textfield
      label="Search First name"
      variant="outlined"
      type="search"
      bind:value={search}
      on:input={handleSearch}
    >
      <Icon style="padding-left: 10px;" class="material-icons" slot="leadingIcon">search</Icon>
    </Textfield>
  </Cell>
  <Cell span={6} />
  <Cell span={2}>
    <Button variant="outlined" on:click={() => (openEvaluatorCreator = true)}>Add Evaluator</Button>
  </Cell>
</LayoutGrid>
<!-- Table -->
<DataTable
  stickyHeader
  table$aria-label="Evaluators list"
  style="width: 100%;"
  sortable
  bind:sort
  bind:sortDirection
  on:SMUIDataTable:sorted={handleSort}
>
  <Head>
    <Row>
      <DCell columnId="firstName">
        <Label>First</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </DCell>
      <DCell columnId="lastName">
        <Label>Last</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </DCell>
      <DCell columnId="email" sortable={false}>
        <Label>Email</Label>
      </DCell>
      <DCell columnId="phone" sortable={false}>
        <Label>Phone Number</Label>
      </DCell>
      <DCell sortable={false} />
    </Row>
  </Head>
  <Body>
    {#each $evaluators as evaluator}
      <Row>
        <DCell>{evaluator.firstName}</DCell>
        <DCell>{evaluator.lastName}</DCell>
        <DCell><a href="mailto:{evaluator.email}">{evaluator.email}</a></DCell>
        <DCell><a href="tel:{evaluator.phone}">{evaluator.phone}</a></DCell>
        <DCell
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
          ></DCell
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
      {start + 1}-{end} of {$evaluators.length}
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
