<script>
    import Icon from "./Icon.svelte";
  
    import Playheading from "./playheading.svelte";
  
    export let half = undefined;
    export let visibility = undefined;
    export let playid = undefined;
    export let title = undefined;
    export let length;
    export let author = undefined;
    export let synopsis;
  </script>
  
  {#if half}
    <label class="checkbox" for={playid}>
      <input class="checkbox" name={playid} id={playid} type="checkbox" />
      <div class="play-container-half" style="display: {visibility};" on:click>
        <span>
          {title}
        </span>
        <span>
          {author}
        </span>
        <span>
          {length}
        </span>
        <span>
          {synopsis}
        </span>
       
      </div>
    </label>
  {:else}
    <!-- <a href="{play.id}-profile">
      <div class="play-container">
        <span>
          {play.title}
        </span>
        <span>
          {play.rating}/10
        </span>
        <span>
          {play.tone}
        </span>
        <span>
          {play.actorCount}
        </span>
        <span>
          {play.pages}
        </span>
        <span>
          {play.authorName}
        </span>
        <span>
          {play.authorGender}
        </span>
        <span>
          {play.authorEthnicity}
        </span>
        <span>
          {play.authorRegion}
        </span>
      </div>
    </a> -->
  {/if}
  
  <style>
    .play-container {
      display: grid;
      grid-template-columns: 22% 7% 10% 6% 6% 18% 9% 9% 11%;
      text-align: left;
      padding: 1.5% 0% 1.5% 1%;
      border-bottom: thin solid var(--secondary-color-dark);
      transition: all 0.3s ease-out;
    }
    .play-container:hover {
      background-color: white;
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
      transform: scale(0.95);
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
  
    :checked + .play-container-half {
      background-color: rgb(240, 178, 178);
      border-radius: 5px;
      transform: scale(1.05);
    }
    :checked + .play-container-half:active {
      background-color: rgb(240, 178, 178);
      border-radius: 5px;
      transform: scale(0.95);
    }
  </style>
  