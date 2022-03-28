<script>
  import Icon from "$lib/components/Icon.svelte";
  // Needs a way to get list of all assigned plays for the evaluator that is logged in
  // Not all data, just meta-info:  _______________


  // import PlayHeading from "$lib/components/playheading.svelte";
    // import Play from "$lib/components/play.svelte";
    import PlayAssigned from "$lib/components/assignedPlays.svelte"
    import { is_empty, onMount } from "svelte/internal";
    //import { getPlayByID } from "$lib/dbFunctions";
 
  
  function getCookie(cname) {
    

      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
  
  }
  
  async function getPlaysAssigned() {
    
    let username = getCookie("user");
    console.log(`The username passed by getCookie var is: ${username}`);

    let response = await fetch('../../server/evaluator/playsAssigned.json?username=' + username , { //
      method:'GET',
      credentials:'same-origin',
      headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
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
    // console.log(`This is coming from assigned-plays.svelte --->${data}`);
   
    convertPlaysToArray = data[0];
    convertPlaysToArray.forEach(assignedPlay => {        
      const {
      _id: id,
      title = "Unknown",
      author = "Unknown",
      rating = 0,
      toneOfPlay = "Unknown",
      numOfPages= 0,
      men = 0,
      women = 0,
      either = 0,
      actExplain = "Unknown",
      synopsis = "Unknown",
      future = "Unknown",
      length = 0,
    } = assignedPlay;
    playsAssigned = [
      ...playsAssigned,
      {
        id,
        title,
        author,
        rating,
        toneOfPlay,
        numOfPages,
        men,
        women,
        either,
        actExplain,
        future,
        synopsis,
        length,
      },
    ];
});
    loading = false;
  }); //end onMount
   
  
    // async function getAssignedPlayByID(id) {
    //   let res = await fetch('../../server/evaluator/getPlayAssignedByID.json?id=' + id , {
    //     method:'GET',
    //     credentials:'same-origin',
    //     headers:{
    //          'Content-Type':'application/json'
    //     },
    //   });
      
    //   const playID = await res.json();
    //   if(res.ok) {
    //     return playID;
    //   } else {
    //     throw new Error('Something wrong with getting the evaluations response!!');
    //   }
    // }
    
    // async function getEvaluations() {
    //   let response = await fetch('../../server/evaluator/evaluations.json', {
    //     method:'GET',
    //     credentials:'same-origin',
    //     headers:{
    //          'Content-Type':'application/json'
    //     },
    // });
    //   const evaluations = await response.json();
    //   if(response.ok) {
    //     return evaluations;
    //   } else {
    //     throw new Error('Something wrong with getting the evaluations response!!');
    //   }
    // }// end getEvaluations()
    let loading = true;
    let evaluations = [];

    // onMount(async() => {
    //   let data = await getEvaluations();
    //   console.log(data);
    //   for (let i = 0; i < data.length; i++) {
    //     console.log(data[i]);
    //     let play = await getAssignedPlayByID(data[i].playID)
    //     if (play) {
    //       let play2 = play;
    //       let newObj = { ...data[i], title: play2 && play2[0] && play2[0].title ? play2[0].title : '' };
    //       console.log('Play: ', newObj);
    //       data[i] = newObj;
    //     }
    //   }
    //   evaluations = data;
    //   console.log('Data Updated: ', data);
      
    //   loading = false;

    // }); //end onMount
    
    // let playVis = {};
    // data.plays.forEach( play => {
    //     playVis[play.playid] = "visible";
    //   });
    // onMount(async() => {
      
    // })
    let search;
    let dropdown;
    /*
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
    */
    function openEvaluationForm(playID) {
      if (playID) {
        window.location.replace('./evaluation?playid=' + playID);
      }
    };


</script>

<h1 class="header">Assigned Plays</h1>

<div class="assigned-plays-heading">
  <span/>
  <span class="title">Title</span>
  <span class="tone">Author</span>
  <!-- <span class="pages">Pages</span> -->
  <!-- <span class="status">Status</span> -->
</div>

<!-- <a href="{play.id}-profile"> -->
<div class="play-container">
  {#each playsAssigned as assignedPlay}

        <PlayAssigned half checkbox
          playid={assignedPlay.id}
          title={assignedPlay.title}
          tone={assignedPlay.toneOfPlay}
          actors={assignedPlay.numOfMales}
          pages={assignedPlay.numOfPages}
          rating = {assignedPlay.rating}
          author = {assignedPlay.author}
          on:click="{openEvaluationForm(assignedPlay.id)}"
          />
  {/each}
</div>

<!-- </a> -->
<style lang="scss">
  .plays-width{

   width: max-content;
    .play-container {
      display: flex;
      padding: 0.5% 3%;
      border-bottom: thin solid var(--secondary-color-dark);
      transition: all 0.3s ease-out;
      &:hover {
        background-color: white;
      }
      span {
        font-size: 14pt;
      }
    }
  }

  .assigned-plays-heading {
    display: flex;
    padding: 0.5% 3%;
    background-color: var(--primary-color-dark);
    box-shadow: 0px 0px 5px gray;
    border-radius: 15px;
    span {
      font-size: 14pt;
      color: white;
    }
  }
  .title {
    flex-grow: 8;
  }
  .tone {
    flex-grow: 1;
  }
  .pages {
    flex-grow: 1;
  }
  .status {
    flex-grow: 1;
  }
</style>
