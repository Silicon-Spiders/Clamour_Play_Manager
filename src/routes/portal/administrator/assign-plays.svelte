<script>
  import PlayHeading from "$lib/components/playheading.svelte";
  import EvaluatorHeading from "$lib/components/evaluatorheading.svelte"
  import Play from "$lib/components/play.svelte";
  import Evaluator from "$lib/components/evaluator.svelte";

  //we will use this format when getting the data
  let data = {
    plays: [
      {
        playid:1,
        title:"Romeo and Juliet",
        tone:"Drama",
        actors:"5",
        pages:"100",
        authorName:"Shakespeare",
        visibility:"visible",
      },
      {
        playid:2,
        title:"Hamlet",
        tone:"Drama",
        actors:"5",
        pages:"125",
        authorName:"Shakespeare",
        visibility:"visible",
      },
      {
        playid:3,
        title:"Macbeth",
        tone:"Drama",
        actors:"7",
        pages:"160",
        authorName:"Shakespeare",
        visibility:"visible",
      },
      {
        playid:4,
        title:"Waiting for Godot",
        tone:"Comedy",
        actors:"3",
        pages:"67",
        authorName:"Samuel Beckett",
        visibility:"visible",
      },
      {
        playid:5,
        title:"The Great Gatsby",
        tone:"Drama",
        actors:"5",
        pages:"37",
        authorName:"Leonardo",
        visibility:"visible",
      },
      {
        playid:6,
        title:"Romeo and Juliet",
        tone:"Drama",
        actors:"5",
        pages:"100",
        authorName:"Shakespeare",
        visibility:"visible",
      },
      {
        playid:7,
        title:"Hamlet",
        tone:"Drama",
        actors:"5",
        pages:"125",
        authorName:"Shakespeare",
        visibility:"visible",
      },
      {
        playid:8,
        title:"Macbeth",
        tone:"Drama",
        actors:"7",
        pages:"160",
        authorName:"Shakespeare",
        visibility:"visible",
      },
      {
        playid:9,
        title:"Waiting for Godot",
        tone:"Comedy",
        actors:"3",
        pages:"67",
        authorName:"Samuel Beckett",
        visibility:"visible",
      },
      {
        playid:10,
        title:"The Great Gatsby",
        tone:"Drama",
        actors:"5",
        pages:"37",
        authorName:"Leonardo",
        visibility:"visible",
      },
      {
        playid:11,
        title:"Romeo and Juliet",
        tone:"Drama",
        actors:"5",
        pages:"100",
        authorName:"Shakespeare",
        visibility:"visible",
      },
      {
        playid:12,
        title:"Hamlet",
        tone:"Drama",
        actors:"5",
        pages:"125",
        authorName:"Shakespeare",
        visibility:"visible",
      },
      {
        playid:13,
        title:"Macbeth",
        tone:"Drama",
        actors:"7",
        pages:"160",
        authorName:"Shakespeare",
        visibility:"visible",
      },
      {
        playid:14,
        title:"Waiting for Godot",
        tone:"Comedy",
        actors:"3",
        pages:"67",
        authorName:"Samuel Beckett",
        visibility:"visible",
      },
      {
        playid:15,
        title:"The Great Gatsby",
        tone:"Drama",
        actors:"5",
        pages:"37",
        authorName:"Leonardo",
        visibility:"visible",
      }
    ],
    evaluators: [
      {
        evalid:1,
        fname:"David",
        lname:"Letterman",
        email:"Dletterman@gmail.com",
        playcount:4
      },
      {
        evalid:2,
        fname:"Jerry",
        lname:"Springer",
        email:"Jspringer@gmail.com",
        playcount:2
      },
      {
        evalid:3,
        fname:"Michael",
        lname:"Fox",
        email:"Mfox@gmail.com",
        playcount:1
      }
    ]
  }

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

    return array;
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
</script>

<body class="body-style">
  <div class="toolbar">
    <label>Search: <input class="search-bar" type="search" bind:value={search} on:input={() => filterPlays()} /></label>
    <label for="tone">Tone:</label>
    <select class="dropdown-field" name="tone" id="tone" bind:value={dropdown} on:change={() => filterPlays()}>
      <option value="All">All</option>
      <option value="Comedy">Comedy</option>
      <option value="Drama">Drama</option>
    </select>
    <button on:click={() => getData()}>Data</button>
  </div>

  <form class="form" action="POST" on:submit|preventDefault={submit}>
    <div class="full-container">
      <div class="half-container">
        <h2>Plays</h2>
        <PlayHeading half />
    
        {#each data.plays as play}
          <Play half checkbox 
            visibility={playVis[play.playid]}
            playid={"playid=" + play.playid} 
            title={play.title} 
            tone={play.tone} 
            actors={play.actors} 
            pages={play.pages} 
            author={play.authorName} />
        {/each}
      </div>
    
      <div class="half-container">
        <h2>Evaluators</h2>
        <EvaluatorHeading half />
    
        {#each data.evaluators as evaluator}
          <Evaluator half checkbox
            evalid={"evalid=" + evaluator.evalid}
            fname={evaluator.fname}
            lname={evaluator.lname}
            email={evaluator.email}
            playcount={evaluator.playcount}
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