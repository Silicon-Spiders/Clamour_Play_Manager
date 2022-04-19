<script>
import Play from "$lib/components/play.svelte";
import DataTable, { Head, Body, Row, Cell as Cell, Pagination, SortValue } from "@smui/data-table";
import { is_empty, onMount } from "svelte/internal"; 
import LinearProgress from '@smui/linear-progress';
import List, { Item, Text, Graphic, Separator, Subheader } from "@smui/list";
import Icon from "$lib/components/Icon.svelte";
import { pageTitle } from '$lib/stores';

onMount(() => {
    $pageTitle = "Evaluations Completed";
  });

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
    let loaded = true;
   
   console.log(`EvaluationAry length is : ${evaluationsAry.length}`);
</script>

<svelte:head>
    <title>Evaluator Menu</title>
</svelte:head>

  <DataTable table$aria-label="Evaluation list" style="width: 100%;">
    <Head>
      <Row>
        <Cell style="width: 100%;">Title</Cell>
        <Cell>Tone</Cell>
        <Cell numeric>Page Number</Cell>
        <Cell numeric>
          Rating
          <Icon code="star"></Icon>
        </Cell>
      </Row>
    </Head>
    <Body>
      {#if evaluationsAry.length > 0}

      {#each evaluationsAry as evall}
      
      <Row>
        <Cell> {evall.title}</Cell>
        <Cell> {evall.toneOfPlay}</Cell>
        <Cell numeric> {evall.numOfPages}</Cell>
        <Cell numeric> {evall.rating}/10</Cell>
      </Row>

      {/each}

      {:else}

      <Row>
        <Cell> No Evaluations Completed </Cell>
      </Row>

      {/if}

      
    </Body>
  
    <LinearProgress
      indeterminate
      bind:closed={loaded}
      aria-label="Data is being loaded..."
      slot="progress"
    />
  </DataTable>

