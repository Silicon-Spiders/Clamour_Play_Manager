<script>
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { Cell as LGCell } from '@smui/layout-grid';
  import List, { Item, Meta, Label } from '@smui/list';
  
  import { pageTitle } from "$lib/stores";
  import LayoutGrid from "@smui/layout-grid/src/LayoutGrid.svelte";
  import Button from '@smui/button/src/Button.svelte';

  $pageTitle = "Assign Plays";

  //we will use this format when getting the data
  let data = {
    plays: [],
    evaluators: [],
  };

  let playVis = {};
  let message = "Must have at least one play and one evaluator selected";
  data.plays.forEach( play => {
      playVis[play.playid] = "visible";
    });
  
  let mainForm;

  async function getData() {
    const array = await fetch("../../server/admin/assign.json", {
      method: "GET",
      headers: {
      'Content-Type': 'application/json'
      },
    });

    const myData = await array.json();

    data.plays = myData.plays;
    data.evaluators = myData.evaluators;
    return;
  }

  async function assign(array) {
    const assign = await fetch("../../server/admin/assign.json", {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(array),
    });
  }

  async function submit(e) {
    const form = e.target;
    let newForm = new FormData(form);
    let formJSON = {
      evaluators: [],
      plays: [],
    };
    newForm.forEach((value, key) => {
      // formJSON[key] = value
      let entry = key.split("=");
      if (entry[0] == "evalid") {
        formJSON.evaluators.push(entry[1]);
      } else if (entry[0] == "playid") {
        formJSON.plays.push(entry[1]);
      }
    });
    let response = await assign(formJSON);
    await getData();
    document.querySelectorAll('input[type=checkbox]').forEach(input => {input.checked = false});
    updateMessage();
    location.reload()
  }

  function updateMessage() {
    let dummyJSON = {
      plays: [],
      evaluators: [],
    };
    let fakeForm = new FormData(mainForm);
    fakeForm.forEach((value, key) => {
      let entry = key.split("=");
      if (entry[0] == "evalid") {
        dummyJSON.evaluators.push(entry[1]);
      } else if (entry[0] == "playid") {
        dummyJSON.plays.push(entry[1]);
      }
    });
    if (dummyJSON.plays.length > 0 && dummyJSON.evaluators.length > 0) {
      document.getElementById("submission").disabled = false;
      message = "No issues found";
    } else {
      document.getElementById("submission").disabled = true;
      message = "Must have at least one play and one evaluator selected";
    }
    data.evaluators.forEach((key) => {
      document.getElementById(`row-${key._id}`).style.backgroundColor = "white";
      if (dummyJSON.evaluators.includes(key._id)) {
        for (const play in key.plays) {
          dummyJSON.plays.forEach((key2) => {
            if (key2 == play) {
              let playobj = data.plays.find(a => a._id == play? a.title: null);
              
              if (key.plays[play] == "fin") {
                message = `[WARN] User: ${key.firstName} ${key.lastName} has already finished ${playobj.title}`;
                document.getElementById(`row-${key._id}`).style.backgroundColor = "orange";
              }
              else {
                message = `[WARN] User: ${key.firstName} ${key.lastName} is already assigned ${playobj.title}`;
                document.getElementById(`row-${key._id}`).style.backgroundColor = "yellow";
              }
            }
          })
        }
      } else {
        document.getElementById(`row-${key._id}`).style.backgroundColor = "white";
      }
    })
  }

  function sepData(plays) {
    let fin = 0;
    let unf = 0;
    Object.keys(plays).forEach(play => {
      if (plays[play] == "unf") {
        unf++;
      } else {
        fin++;
      }
    });
    return unf + " | " + fin;
  }
</script>


<form class="form" bind:this={mainForm} on:submit|preventDefault={submit} on:load={getData()} on:load={updateMessage()}>
  <LayoutGrid>
    <LGCell span=7>
      <DataTable 
      stickyHeader 
      style="overflow-y: scroll; overflow-x: visible; max-height: 70vh; width: 100%;"
      >
        <Head>
          <Row>
            <Cell></Cell>
            <Cell>
              <Label>Title</Label>
            </Cell>
            <Cell>
              <Label>Author</Label>
            </Cell>
            <Cell>
              <Label>Page Count</Label>
            </Cell>
          </Row>
        </Head>
        <Body>
          {#each data.plays as play}
            <Row on:click={document.getElementById(`playid=${play._id}`).checked = !document.getElementById(`playid=${play._id}`).checked} on:click={updateMessage} >
              <Cell>
                <input class="checkbox" name={"playid=" + play._id} id={"playid=" + play._id} type="checkbox"/>
              </Cell>
              <Cell>{play.title}</Cell>
              <Cell>{play.author}</Cell>
              <Cell>{play.length}</Cell>
            </Row>
          {/each}
        </Body>
      </DataTable>
    </LGCell>
    <LGCell span=5>
      <DataTable stickyHeader style="overflow-y: scroll; max-height: 70vh; width: 100%;">
        <Head>
          <Row>
            <Cell></Cell>
            <Cell>Title</Cell>
            <Cell>Author</Cell>
            <Cell>Page Count</Cell>
          </Row>
        </Head>
        <Body>
          {#each data.evaluators as evaluator}
            <Row id={`row-${evaluator._id}`} on:click={document.getElementById(`evalid=${evaluator._id}`).checked = !document.getElementById(`evalid=${evaluator._id}`).checked} on:click={updateMessage}>
              <Cell>
                <input class="checkbox" name={"evalid=" + evaluator._id} id={"evalid=" + evaluator._id} type="checkbox" />
              </Cell>
              <Cell>{`${evaluator.firstName} ${evaluator.lastName}`}</Cell>
              <Cell>{evaluator.email}</Cell>
              <Cell>{sepData(evaluator.plays)}</Cell>
            </Row>
          {/each}
        </Body>
      </DataTable>
    </LGCell>
    <LGCell span=10>
      <div class="message">
        {message}
      </div>
    </LGCell>
    <LGCell span=2>
      <Button id="submission" on:click={submit} style="width: 100%;" variant="raised" >Submit</Button>
    </LGCell>
  </LayoutGrid>
</form>


<style>
  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .message {
    display: flex;
    background-color: lightgrey;
    border-radius: 10px;
    height: 100%;
    align-items: center;
    padding-left: 10px;
  }
  input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--form-background);
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.5em;
    height: 1.5em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
  }
  input[type="checkbox"]::before {
    content: "";
    width: 0.95em;
    height: 0.95em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    background-color: CanvasText;
  }
  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }
</style>




<!-- on:load={() => getData()} -->
<!-- <body class="body-style">
  

  <form class="form" action="POST" on:submit|preventDefault={submit}>
    <div class="full-container">
      <div class="half-container">
        <h2>Plays</h2>
        <PlayHeading half />
    
        {#each data.plays as play}
          <Play half checkbox 
            visibility={playVis[play._id]}
            playid={"playid=" + play._id} 
            title={play.title} 
            tone={play.tone} 
            actors={play.actors} 
            pages={play.length} 
            author={play.author} />
        {/each}
      </div>
    
      <div class="half-container">
        <h2>Evaluators</h2>
        <EvaluatorHeading half />
    
        {#each data.evaluators as evaluator}
          <Evaluator half checkbox
            evalid={"evalid=" + evaluator._id}
            fname={evaluator.firstName}
            lname={evaluator.lastName}
            email={evaluator.email}
            playcount={sepData(evaluator.plays)}
          />
        {/each}
      </div>
    </div>
    <button class="submit">Submit</button>
  </form>
</body>

<style>
  .body-style {
    height: 98%;
    width: 100%;
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
    transition: all 0.5s ease;
  }

  .reload {
    border-radius: 5px;
    border: black solid 1px;
    background-color: rgb(240, 178, 178);
    height: 30px;
    transition: all 0.5s ease;
  }

  .reload:hover , .submit:hover{
    background-color: lightcoral;
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
  .dropdown-field {
    padding: 6px;
    border: none;
    border-radius: 4px;
  }
</style> -->