<script>
  import Evaluator from "$lib/components/evaluatorcreation.svelte";
  import SideProfile from "$lib/components/SideProfile.svelte";
  import { pageTitle, sideProfile } from "$lib/stores";
  import { onMount } from "svelte";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import Button from "@smui/button";

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
  // console.log(evaluators);
</script>

<!-- <div class="half-container"> -->
<!-- <form class="form" action="POST"> -->
<!-- <div class="full-container"> -->
<!-- <div class="half-container">
      <table class="" align="center" style="width: 90%;">
        <colgroup>
          <col span="2" style="width: 90%;" />
          <col span="2" style="width: 90%;" />
          <col span="2" style="width: 90%;" />
        </colgroup>

        <h2 align="left">Evaluator Account Information</h2>
        <tr>
          <td>
            <label for="Last Name">Last Name:</label>
            <input class="text-box" type="text" id="Last Name" name="Last Name" required />
            <br />
            <br />

            <label for="First Name">First Name:</label>
            <input class="text-box" type="text" id="First Name" name="First Name" required />
            <br />
            <br />

            <label for="phone">Phone Number:</label>
            <input class="text-box" type="tel" id="phone" name="phone" required />
            <small>Ex: (123)456-7890</small>
            <br />
            <br />

            <label for="Email">Email:</label>
            <input class="text-box" type="email" id="Email" name="Email" require />
            <br />
            <br />

            <label for="uname">Username:</label>
            <input class="text-box" type="text" id="uname" name="uname" required />
            <br />
            <br />

            <label for="pword">Password:</label>
            <input class="text-box" type="password" id="pword" name="pword" required />
            <br />
            <br />

            <input on:click={() => (finish = true)} type="submit" class="submit" value="Save" />
          </td>
        </tr>
      </table>
    </div> -->

<!-- <h1>Evaluators ({evaluators.length} Found)</h1> -->

<main>
  <div class="evaluators">
    <DataTable stickyHeader table$aria-label="User list" style="width: 100%;">
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
  </div>
  <!-- <div class="evaluators">
    <div class="heading">
      <span id="name">Name</span>
      <span id="email">Email</span>
      <span id="phone">Phone Number</span>
    </div>
    {#each evaluators as evaluator}
      <Evaluator {evaluator} on:click={() => ($sideProfile = evaluator)} />
    {/each}
  </div> -->
  <SideProfile />
</main>

<!-- </div> -->
<!-- </div> -->

<!-- </form> -->
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
  .heading {
    display: flex;
    align-items: center;
    font-size: 14pt;
    padding: 0.5% 2%;
    background-color: var(--primary-color-dark);
    color: white;
    border-radius: 10px;
  }
  #name {
    flex-basis: 30%;
  }
  #email {
    flex-basis: 30%;
  }
  #phone {
    flex-basis: 30%;
  }
</style>
