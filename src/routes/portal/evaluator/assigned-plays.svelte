<script>
  import Icon from "$lib/components/Icon.svelte";

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
   
    convertPlaysToArray = data[0];
    console.log(`Length val of 2nd obj in ary is : ${convertPlaysToArray[1].length}`);

    convertPlaysToArray.forEach(assignedPlay => {        
      let {
      _id: id,
      title = "Unknown",
      author = "Unknown",
      length,
      men = 0,
      women = 0,
      either = 0,
      actExplain = "Unknown",
      future = "Unknown",
      synopsis = "Unknown",
    } = assignedPlay;
    playsAssigned = [
      ...playsAssigned,
      {
        id,
        title,
        author,
        length,
        men,
        women,
        either,
        actExplain,
        future,
        synopsis,
      },
    ];
});
    loading = false;
    
    console.log(`PlaysAssigned's length prop : ${playsAssigned[0].length}`);


//     const selectElement = document.getElementById('status');

//     selectElement.addEventListener('change', (event) => {

//     let value = event.target.value;
//     playsAssigned = playsAssigned.filter(x => )
// });

  }); //end onMount
   
  
    let loading = true;

   
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

<div style="float:right"> 
  <!-- <select name="status" id="status">
    <option value="f">Finished</option>
    <option value="unf">Unfinished</option>
     </select> -->
</div>
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
          length={assignedPlay.length}
          author = {assignedPlay.author}
          synopsis={assignedPlay.synopsis}
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
