<script>
    import Icon from "$lib/components/Icon.svelte";
    import PlayAssigned from "$lib/components/assignedPlays.svelte"
    import { onMount } from "svelte";
    import { pageTitle } from "$lib/stores";
    import DataTable, { Head, Body, Row, Cell as Cell, Pagination, SortValue } from "@smui/data-table";
    import { goto } from "$app/navigation";
    import IconButton from "@smui/icon-button";
    import Select, { Option } from "@smui/select";
    import Textfield from "@smui/textfield";
    import Button, { Label } from "@smui/button";
    import LinearProgress from '@smui/linear-progress';
  
  onMount(() => {
      $pageTitle = "Past Assigned Plays";
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
    
    async function getFinishedPlays() {
      
      let username = getCookie("user");
      console.log(`The username passed by getCookie var is: ${username}`);
  
      let response = await fetch('../../server/evaluator/getFinishedPlays.json?username=' + username , { //
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
    
  let finishedPlays = [];
  let convertPlaysToArray = [];
  
    onMount(async() => {
  
      let data = await getFinishedPlays();
     
      convertPlaysToArray = data[0];
      console.log(`data from getFinishPlays is: ${convertPlaysToArray}`);
  
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
      finishedPlays = [
        ...finishedPlays,
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
        
  
    }); //end onMount
     
    
      let loading = true;
  
     
      let search;
      let dropdown;
     
  
  let loaded = true;
  
  </script>
  
  <div style="margin-bottom: 1em;">
    <!-- <Button on:click={() => loadThings(true)}>Do Pretend Loading</Button> -->
  </div>
  
  <DataTable table$aria-label="User list" style="width: 100%;">
    <Head>
      <Row>
        <Cell style="width: 100%;">Title</Cell>
        <Cell>Author</Cell>
        <Cell numeric>Page Number</Cell>
      </Row>
    </Head>
    <Body>
  
      {#if finishedPlays.length > 0}
  
      {#each finishedPlays as assignedPlay}
      <Row>
          <Cell>{assignedPlay.title}</Cell>
          <Cell>{assignedPlay.author}</Cell>
          <Cell numeric>{assignedPlay.length}</Cell>
        </Row>
      {/each}
  
      {:else}
  
      <Row>
        <Cell>No Plays have been evaluated.</Cell>
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
  
    
  