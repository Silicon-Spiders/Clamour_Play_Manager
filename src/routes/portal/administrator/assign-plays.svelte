<script>
  import { each } from "svelte/internal";

  import PlayHeading from "$lib/components/playheading.svelte";
  import Play from "$lib/components/play.svelte";

  let selectedPlays;
  $: console.log(selectedPlays);

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
      },
      {
        playid:2,
        title:"Hamlet",
        tone:"Drama",
        actors:"5",
        pages:"125",
        authorName:"Shakespeare",
      },
      {
        playid:3,
        title:"Macbeth",
        tone:"Drama",
        actors:"7",
        pages:"160",
        authorName:"Shakespeare",
      },
      {
        playid:4,
        title:"Waiting for Godot",
        tone:"Comedy",
        actors:"3",
        pages:"67",
        authorName:"Samuel Beckett",
      },
      {
        playid:5,
        title:"The Great Gatsby",
        tone:"Drama",
        actors:"5",
        pages:"37",
        authorName:"Leonardo",
      }
    ],
    evaluators: [

    ]
  }


</script>

<div class="toolbar">
  <label>Search: <input class="search-bar" type="search" /></label>
  <label for="toneFilter">Tone:</label>
  <select class="dropdown-field" name="tone" id="tone">
    <option value="comendy">Comedy</option>
    <option value="drama">Drama</option>
  </select>
</div>


<div class="top-container">
  <div class="half-container">
    <h2>Plays</h2>
    <PlayHeading half />

    {#each data.plays as play}
    <label for={play.playid}>
      <Play half checkbox>
        <span slot="checkbox">
          <input name="assignedPlays" id={play.playid} type="checkbox" />
        </span>
        <span slot="title">{play.title}</span>
        <span slot="tone">{play.tone}</span>
        <span slot="actors">{play.actors}</span>
        <span slot="pages">{play.pages}</span>
        <span slot="authorName">{play.authorName}</span>
      </Play>
    </label>
    {/each}
  </div>
  <div class="half-container">
    <h2>Evaluators</h2>
    <PlayHeading half />

    {#each data.plays as play}
    <label for={play.playid}>
      <Play half checkbox>
        <span slot="checkbox">
          <input name="assignedPlays" id={play.playid} type="checkbox" />
        </span>
        <span slot="title">{play.title}</span>
        <span slot="tone">{play.tone}</span>
        <span slot="actors">{play.actors}</span>
        <span slot="pages">{play.pages}</span>
        <span slot="authorName">{play.authorName}</span>
      </Play>
    </label>
    {/each}
  </div>
</div>

<style>

  .half-container {
    width: 47%;
    height: 100%;
    padding: 15px;
    margin-top: 5px;
    background-color: lightgray;
    border-radius: 15px;
    display: inline-block;
    overflow-y: auto;
  }

  .half-container h2{
    margin: 10px;
  }

  .top-container {
    height: 85%;
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
