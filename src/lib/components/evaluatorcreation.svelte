<script>
    import Icon from "./Icon.svelte";
  
    import Playheading from "./playheading.svelte";
  
    export let half;
    export let visibility;
    export let evalid;
    export let fname;
    export let lname;
    export let email;
    export let phone;

    let fullname = fname+ " " + lname;
  </script>
  
  {#if half}
    <label class="checkbox" for={evalid}>
      <input class="checkbox" name={evalid} id={evalid} type="checkbox" />
      <div class="play-container-half" style="display: {visibility};">
        <span>
          {fullname}
        </span>
        <span>
          {email}
        </span>
        <span>
          {phone}
        </span>
      </div>
    </label>
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
      grid-template-columns: 30% 40% 25%;
      text-align: left;
      padding-right: 6px;
      margin-top: 1px;
      margin-left: 15px;
      border-radius: 15px;
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