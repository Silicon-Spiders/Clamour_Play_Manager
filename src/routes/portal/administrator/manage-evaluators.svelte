<svelte:head>
  <title>Reviewer Account Information</title>
</svelte:head>

<script>
  import {} from "os";
  import Evaluator from "$lib/components/evaluatorcreation.svelte";

  async function submit(e) {
    const form = e.target;

    getData();
  }

  let data = {
    evaluators: []
  }

  async function getData() {
    const array = await fetch("../../server/admin/manage.json", {
      method: "GET"
    });

    const myData = await array.json();

    console.log(myData);

    data.evaluators = myData.evaluators;

    console.log(data);
    return;
  }
  let finish = false;
</script>

<body class="tool-bar">
  <div class="toolbar" on:load={getData()}>
    <label>Search: <input class="search-bar" type="search" /></label>
    <button class="reload" on:click={() => getData()}>Refresh</button>
  </div>
</body>

<form class="form" action="POST" on:submit|preventDefault={submit} style= "display: {finish ? '' : 'block'}">
  <div class="full-container">
    <div class="half-container">
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

          <input on:click={() => (finish = true)} type="submit" class="submit" value="Save"/> 
          </td>
        </tr>
      </table>
    </div>

    <div class="half-container h2">
      <h2 align="left">Evaluators</h2>

      <div class="heading">
        <span/>
        <span>Name</span>
        <span>Email</span>
        <span>Phone Number</span>
      </div>

      {#each data.evaluators as evaluator}
      <Evaluator half checkbox
        evalid={"evalid=" + evaluator._id}
        fname={evaluator.firstName}
        lname={evaluator.lastName}
        email={evaluator.email}
        phone={evaluator.phone}
      />
    {/each}
      
    </div>
  </div>
</form>

<style>
  .tool-bar {
    height: 5%;
  }
  .form {
    height: inherit;
  }
  .submit {
    position: absolute;
    right: 5%;
    bottom: 5%;
    background-color: rgb(240, 178, 178);
    border-radius: 5px;
    height: 5%;
    width: 15%;
  }
  .heading {

    display: grid;
    grid-template-columns: 5% 30% 35% 40%;
    font-size: 14pt;
    padding-right: 4.2%;
    border-bottom: thin solid var(--secondary-color-dark);
    border-radius: 15px;
    background-color: var(--primary-color-dark);
    padding: 5px;
    color: white;
  }
  .half-container {
    width: 47%;
    height: 100%;
    padding: 15px;
    margin: auto;
    background-color: lightgray;
    border-radius: 15px;
    display: inline-block;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .half-container h2{
    margin: 10px;
  }

  .full-container {
    height: 80%;
    display: flex;
  }

  ::-webkit-scrollbar {
  width: 10px;
  }
  ::-webkit-scrollbar-thumb {
  background: darkgray; 
  border-radius: 20px;
  }

  .search-bar {
    padding: 6px;
    border: none;
    border-radius: 4px;
  }

  .text-box {
    padding: 4px;
    border: none;
    border-radius: 4px; 
  }
</style>
