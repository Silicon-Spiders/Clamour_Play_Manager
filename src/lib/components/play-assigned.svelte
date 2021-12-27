<script>
import { writable } from "svelte/store";


    // import { writableArray } from "../evaluator/evaluatorPage.svelte"
    export let half;
    export let visibility;
    export let playid;
    export let title;
    export let tone;
    export let actors;
    export let pages;
    export let author;


    function redirectUser() {


        console.log({playid});

    //     const evaluatorArray = () => {
	// 	$writableArray = [...$writableArray, {
	// 		title:{title}
	// 	}];
	// };
        // if( document.getElementById({playid}).checked) {
            
         window.location.assign('../evaluator/evaluation');
        //     return false;
        // }
        // console.log('Outside of document.checked');
        // return true;
    }

  </script>
  
  {#if half}
    <label class="checkbox" for={playid}>
      <input class="checkbox" name={playid} id={playid} type="checkbox" on:click={redirectUser} />
        <div class="play-container-half" style="display: {visibility};">
            
            <span>
            {title}
            </span>
            <span>
            {author}
            </span>
            <span>
            {tone}
            </span>
            <span>
            {pages}
            </span>
        </div>

    </label>
  {:else}
    <div class="play-container">
      <span>
        <slot name="title" />
      </span>
      <span>
        <slot name="rating" />
      </span>
      <span>
        <slot name="tone" />
      </span>
      <span>
        <slot name="actors" />
      </span>
      <span>
        <slot name="pages" />
      </span>
      <span>
        <slot name="authorName" />
      </span>
      <span>
        <slot name="authorGender" />
      </span>
      <span>
        <slot name="authorEthnicity" />
      </span>
      <span>
        <slot name="authorRegion" />
      </span>
    </div>
  {/if}
  
  <style>
    .play-container {
      display: grid;
      grid-template-columns: 22% 7% 10% 6% 6% 18% 9% 9% 11%;
      text-align: left;
      padding: 1.5% 0% 1.5% 1%;
      border-bottom: thin solid var(--secondary-color-dark);
    }
    .play-container span {
      display: inline-block;
      font-size: 14pt;
      margin: 0% 1.4%;
    }
    .play-container-half {
      display: grid;
      grid-template-columns: 35% 35% 15% 10%;
      text-align: left;
      padding: 6px;
      margin-top: 1px;
      margin-left: 15px;
     -khtml-user-select: none;
     -webkit-user-select: none;
    }
    .play-container-half:hover {
      background-color: rgb(240, 178, 178);
      border-radius: 5px;
    }
    .play-container-half:active {
      background-color: rgb(240, 178, 178);
      border-radius: 5px;
      transform: scale(.95);
    }
    .play-container-half span {
      margin: 0.7% 1.4% 1.4% 0%;
    }
    .checkbox {
      text-align: right;
    }
    input {
      display: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  
    :checked + .play-container-half{
      background-color: rgb(240, 178, 178);
      border-radius: 5px;
      transform: scale(1.05);
    }
    :checked + .play-container-half:active {
      background-color: rgb(240, 178, 178);
      border-radius: 5px;
      transform: scale(.95);
    }
  </style>
  