<script>
import Play from "$lib/components/play.svelte";

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

      let username = getCookie("user");

      let response = await fetch('../../server/evaluator/evaluations.json?username=' + username, {
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
    let evaluationsAry = [];

    onMount(async() => {
      let data = await getEvaluations();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
       
      }
      evaluationsAry = data;
      
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

    
   
</script>

<svelte:head>
    <title>Evaluator Menu</title>
</svelte:head>

<h1>Evaluations</h1>
<div class="evaluation-heading-container-half">
    <span />
    <span>Title</span>
    <span>Tone</span>
    <span>Pages</span>
    <span>Rating</span>
  </div>
 
  {#each evaluationsAry as evall}

    <Play half checkbox
    playid={evall.id}
    title={evall.title}
    tone={evall.toneOfPlay}
    pages={evall.numOfPages}
    rating = {evall.rating}
        />

  <!-- {:else}
  <p style="text-align: center;">Loading...</p>
  {/if} -->

  {/each}

  <style>

body-style {
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