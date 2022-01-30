<script>

    import PlayHeading from "$lib/components/playheading.svelte";
    import Play from "$lib/components/play.svelte";
    import { is_empty, onMount } from "svelte/internal";

  let play = {

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

  };
  
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

  onMount(async() => {

    let data = await getPlaysAssigned();
    // let determineLength = !data.length ? console.log('The length is more than 1') : console.log('None found bloodie') ;
    console.log(data);
    data.forEach((play) => {
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
    } = play;
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
    console.log(play); //something wrong with the above code
    loading = false;
  }); //end onMount



  


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
      // console.log(`Incoming data inside onMount -->${data}`);
      // console.log('THIS IS INSIDE THE ONMOUNT RIGHT B4 PRINTING THE DATA FROM AWAIT-GETEVALUATIONS()');
      // let determineLength = !data.length ? console.log('The length is more than 1') : console.log('None found bloodie') ;

      data.forEach((play) => {
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
      } = play;
      evaluations = [
        ...evaluations,
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

    // let playVis = {};

    // data.plays.forEach( play => {
    //     playVis[play.playid] = "visible";
    //   });

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
  </script>
  {#if loading}
    Loading...

    {:else}

  <body class="body-style">
    <div class="toolbar">
      <label>Search: <input class="search-bar" type="search" bind:value={search} on:input={() => filterPlays()} /></label>
      <label for="tone">Tone:</label>
      <select class="dropdown-field" name="tone" id="tone" bind:value={dropdown} on:change={() => filterPlays()}>
        <option value="All">All</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
      </select>
    </div>

    <form class="form" action="POST">
      <div class="full-container">
        <div class="half-container">
          <h2>Play(s) Assigned</h2>
          <PlayHeading half />

          {#each playsAssigned as playAss}
          <Play half checkbox
          playid={playAss.id}
          title={playAss.title}
          tone={playAss.toneOfPlay}
          actors={playAss.numOfMales}
          pages={playAss.numOfPages}
          rating = {playAss.rating}
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