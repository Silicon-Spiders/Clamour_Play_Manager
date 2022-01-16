<script>
  import PlayHeading from "$lib/components/playheading.svelte";
  import EvaluatorHeading from "$lib/components/evaluatorheading.svelte"
  import Play from "$lib/components/play.svelte";
  import Evaluator from "$lib/components/evaluator.svelte";

  //we will use this format when getting the data
  let data= {
    plays: [],
    evaluators: [],
  };

  let playVis = {};

  data.plays.forEach( play => {
      playVis[play.playid] = "visible";
    });
  
  let search;
  let dropdown;

  async function getData() {
    const array = await fetch("../../server/submission.json", {
      method: "GET",
      headers: {
      'Content-Type': 'application/json'
      },
    });

    const myData = await array.json();

    console.log(myData);

    data.plays = myData.plays;
    data.evaluators = myData.evaluators;

    console.log(data);
    return;
  }

  async function submit(e) {
    const form = e.target;
    let newForm = new FormData(form);
    var formJSON = {};
    newForm.forEach((value, key) => formJSON[key] = value);
    console.log(formJSON);
  }

  function filterPlays() {
    data.plays.forEach( play => {
      let visibility = "grid";
      let invis = "none";
      let drop = (dropdown == "All");

      if (search != null && !play.title.toLowerCase().includes(search.toLowerCase())) {
        visibility = invis;
      }

      console.log("play.tone: "+ play.tone +" dropdown: " + dropdown);

      console.log(play.tone === dropdown);
      

      if (!drop){
        console.log("this drop" + drop);
        if (play.tone != dropdown) {
          visibility = invis;
        }
      }

      playVis[play.playid] = visibility;
    });
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
<!-- on:load={() => getData()} -->
<body class="body-style">
  <div class="toolbar" on:load={getData()}>
    <label>Search: <input class="search-bar" type="search" bind:value={search} on:input={() => filterPlays()} /></label>
    <label for="tone">Tone:</label>
    <select class="dropdown-field" name="tone" id="tone" bind:value={dropdown} on:change={() => filterPlays()}>
      <option value="All">All</option>
      <option value="Comedy">Comedy</option>
      <option value="Drama">Drama</option>
    </select>
    <button class="reload" on:click={() => getData()}>Refresh</button>
  </div>

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
</style>