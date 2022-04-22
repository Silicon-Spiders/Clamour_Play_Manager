<!-- RICARDO CARRASCO | USE CASE: VIEW PLAYS -->
<script>
    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import { page } from "$app/stores";
    import { pageTitle } from "$lib/stores";
    import Icon from "$lib/components/Icon.svelte";
    import Button from "@smui/button";
    import Card, { Content } from "@smui/card";
    import Spinner from "$lib/components/Spinner.svelte";
    import { onMount } from "svelte/internal"; 

  
    // $pageTitle = "View Plays";
  
  let singleEvaluation = undefined;
    const { evaluationID } = $page.params;
    // $: singleEvaluation = $evaluationsAry.find((singleEvaluation) => singleEvaluation.id == playID);
  
    
    // async function getPlay() {
    //   window.open("/server/plays/"+playID, '_blank');
    // }

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
    let actors = 0;

    onMount(async() => {
      let data = await getEvaluations();
      console.log(data);
      // for (let i = 0; i < data.length; i++) {
      //   console.log(data[i]);
      
      // }
      evaluationsAry = data;

      loading = false;
      singleEvaluation = evaluationsAry.find((evall) => evall._id == evaluationID);
      actors = singleEvaluation.numOfMales + singleEvaluation.numOfFemales + singleEvaluation.numOfNonSpecific;
    }); //end onMount

    
  </script>
  
  {#if singleEvaluation}
    <h1>{singleEvaluation?.title}</h1>
    <Card style="padding: 0px; background-color: var(--primary-color); color:white">
      <LayoutGrid>
        <Cell align="middle" span={3}>
          Rating: {singleEvaluation?.rating ? singleEvaluation.rating : "--"}/10
        </Cell>
        <Cell align="middle" span={3}>
          Tone: {singleEvaluation?.toneOfPlay ? singleEvaluation.toneOfPlay : "--"}
        </Cell>
        <Cell align="middle" span={3}>
          Actors: {actors ? actors : "--"}
        </Cell>
        <Cell align="middle" span={3}>
          <Button style="background-color: white;" variant="outlined" on:click>
            <!-- INSERT OPEN PDF HERE -->
            <Icon code="open_in_new" --icon-align="middle" --icon-size="1.5em" />
            View
          </Button>
        </Cell>
      </LayoutGrid>
    </Card>
    <!-- Play Info  -->
    <Card>
      <LayoutGrid style="margin: 0px; padding: 0px">
        <Cell span={12}>
          <h2>Evaluation Information</h2>
          <hr />
        </Cell>
        <Cell span={7}>
          <LayoutGrid class="sub-content-grid">
            <Cell span={12}>
              <h3>Play Synopsis</h3>
            </Cell>
            <Cell span={12}>
              {singleEvaluation.synopsis}
            </Cell>
          </LayoutGrid>
        </Cell>
        <Cell span={5}>
          <LayoutGrid class="sub-content-grid">
            <Cell span={12}>
              <h3>Number of Pages</h3>
            </Cell>
            <Cell span={12}>{singleEvaluation.numOfPages}</Cell>
          </LayoutGrid>
        </Cell>
        <Cell span={7}>
          <LayoutGrid class="sub-content-grid">
            <Cell span={12}>
              <h3>What's next for the play?</h3>
            </Cell>
            <Cell span={12}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae perferendis maxime aliquid
              alias fugit quaerat ipsa iste fugiat commodi. Est ipsum veritatis voluptatibus. Officiis
              recusandae assumenda quia. Itaque, qui ad.
            </Cell>
          </LayoutGrid>
        </Cell>
        <Cell span={5}>
          <LayoutGrid class="sub-content-grid">
            <Cell span={12}>
              <h3>Actors</h3>
            </Cell>
            <Cell span={3}>
              <p>Males: {singleEvaluation.numOfMales}</p>
            </Cell>
            <Cell span={3}>
              <p>Females: {singleEvaluation.numOfFemales}</p>
            </Cell>
            <Cell span={3}>
              <p>Neutral: {singleEvaluation.numOfNonSpecific}</p>
            </Cell>
            
          </LayoutGrid>
        </Cell>
        <Cell span={6}>
          <LayoutGrid class="sub-content-grid">
            <Cell span={12}>
              <h3>Evaluator Comments</h3>
            </Cell>
            <Cell span={12}>
              {singleEvaluation.evaluatorComments}
            </Cell>
          </LayoutGrid>
        </Cell>
      </LayoutGrid>
    </Card>
    
  {:else}
    <Spinner />
  {/if}
  
  <style lang="scss">
    :global(.sub-content-grid) {
      padding-top: 0px;
      padding-bottom: 0px;
      margin: 0px;
      h3 {
        margin-bottom: 0px;
      }
    }
  </style>
  