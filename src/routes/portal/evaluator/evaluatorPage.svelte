<script>

    import PlayHeading from "$lib/components/playheading.svelte";
    import Play from "$lib/components/play.svelte";
    import { is_empty, onMount } from "svelte/internal";
    //import { getPlayByID } from "$lib/dbFunctions";

 
  let assignedPlay = {

    id:0,
    title:'',
    numOfPages:0,
    numOfMales:0,
    numOfFemales:0,
    numOfNonSpecific:0,
    toneOfPlay:'',
    synopsis:'',
    evaluatorComments:'',
    rating:0
  }
  
  async function getPlaysAssigned() {

    let response = await fetch('../../server/evaluator/playsAssigned.json', {

      method:'GET',
      credentials:'same-origin',
      headers:{
          'Content-Type':'application/json'
      },
    });

    const playsAssigned = await response.json();

    if(response.ok) {
      return playsAssigned;
    } else {

      throw new Error('Something wrong with getting the plays Assigned response!!');
    }

  }// end getPlaysAssigned()

  

let playsAssigned = [];
let convertPlaysToArray = [];

  onMount(async() => {

    let data = await getPlaysAssigned();

    console.log(data);
   
    convertPlaysToArray = data[0];
    convertPlaysToArray.forEach(assignedPlay => {        
      const {
      _id: id,
      title = "Unknown",
      rating = 0,
      toneOfPlay = "Drama",
      numOfPages= 0,
      numOfMales = 0,
      numOfFemales = "Unknown",
      numOfNonSpecific = "Unknown",
      synopsis = "Unknown",
      evaluatorComments = "Unknown",
    } = assignedPlay;
    playsAssigned = [
      ...playsAssigned,
      {
        id,
        title,
        rating,
        toneOfPlay,
        numOfPages,
        numOfMales,
        numOfFemales,
        numOfNonSpecific,
        synopsis,
        evaluatorComments,
      },
    ];

});
    loading = false;
  }); //end onMount

   
  let evaluation = {

    id:0,
    title:'',
    numOfPages:0,
    numOfMales:0,
    numOfFemales:0,
    numOfNonSpecific:0,
    toneOfPlay:'',
    synopsis:'',
    evaluatorComments:'',
    rating:0,
    playID: ''

  };

    async function getAssignedPlayByID(id) {

      let res = await fetch('../../server/evaluator/getPlayAssignedByID.json?id=' + id , {

        method:'GET',
        credentials:'same-origin',
        headers:{
             'Content-Type':'application/json'
        },

      });
      
      const playID = await res.json();

      if(res.ok) {
        return playID;
      } else {

        throw new Error('Something wrong with getting the evaluations response!!');
      }
    }
    
    async function getEvaluations() {

      let response = await fetch('../../server/evaluator/evaluations.json', {

        method:'GET',
        credentials:'same-origin',
        headers:{
             'Content-Type':'application/json'
        },
    });

      const evaluations = await response.json();

      if(response.ok) {
        return evaluations;
      } else {

        throw new Error('Something wrong with getting the evaluations response!!');
      }

    }// end getEvaluations()

    let loading = true;

    let evaluations = [];

    onMount(async() => {

      let data = await getEvaluations();

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        let play = await getAssignedPlayByID(data[i].playID)
        if (play) {
          let play2 = play;
          let newObj = { ...data[i], title: play2 && play2[0] && play2[0].title ? play2[0].title : '' };

          console.log('Play: ', newObj);

          data[i] = newObj;
        }
      }
      evaluations = data;
      console.log('Data Updated: ', data);
      

      loading = false;
    }); //end onMount

    // let playVis = {};

    // data.plays.forEach( play => {
    //     playVis[play.playid] = "visible";
    //   });

    // onMount(async() => {
      
    // })
    let search;
    let dropdown;


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

    function openEvaluationForm(playID) {

      if (playID) {
        window.open('./evaluation?playid=' + playID);
      }
    };
  </script>
  {#if loading}
    Loading...

    {:else}

  <body class="body-style">
    <!-- <div class="toolbar">
      <label>Search: <input class="search-bar" type="search" bind:value={search} on:input={() => filterPlays()} /></label>
      <label for="tone">Tone:</label>
      <select class="dropdown-field" name="tone" id="tone" bind:value={dropdown} on:change={() => filterPlays()}>
        <option value="All">All</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
      </select>
    </div> -->

    <form class="form" action="POST">
      <div class="full-container">
        <div class="half-container">
          <h2>Play(s) Assigned</h2>
          <PlayHeading half />

          {#each playsAssigned as assignedPlay}
          <Play half checkbox
          playid={assignedPlay.id}
          title={assignedPlay.title}
          tone={assignedPlay.toneOfPlay}
          actors={assignedPlay.numOfMales}
          pages={assignedPlay.numOfPages}
          rating = {assignedPlay.rating}
          on:click="{openEvaluationForm(assignedPlay.id)}"
          />
          {/each}
        </div>

        <div class="half-container">
          <h2>Evaluations Completed</h2>


          <div class="evaluation-heading-container-half">
            <span />
            <span>Title</span>
            <span># of Pages</span>
            <!-- <span>Tone</span> -->
            <span>Rating</span>
          </div>


          <!-- {#if !is_empty(evaluations)} -->

          {#each evaluations as evall}

          <Play half checkbox
          playid={evall.id}
          title={evall.title}
          tone={evall.toneOfPlay}
          actors={evall.numOfMales}
          pages={evall.numOfPages}
          rating = {evall.rating}
            />

          <!-- {:else}
          <p style="text-align: center;">Loading...</p>
          {/if} -->

          {/each}

        </div>
      </div>
    </form>
  </body>
  {/if}
  <style>
    .body-style {
      height: 99%;
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
    .evaluation-heading-container-half {
      display: grid;
      grid-template-columns: 5% 35% 35% 15% 10%;
      text-align: left;
      padding-right: 4.2%;
      border-bottom: thin solid var(--secondary-color-dark);
      border-radius: 15px;
      background-color: var(--primary-color-dark);
    }

    .evaluation-heading-container-half span {
      font-size: 14pt;
      padding: 5px;
      color: white;
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