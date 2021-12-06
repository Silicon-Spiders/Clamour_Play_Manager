<script>
  export let half;
</script>

{#if half}
  <div class="play-heading-container-half">
    <span />
    <span>Title</span>
    <span>Author</span>
    <span>Tone</span>
    <span>Pgs</span>
  </div>
{:else}
  <div class="play-heading-container-full">
    <span>Title</span>
    <span>Rating</span>
    <span>Tone</span>
    <span>Actors</span>
    <span>Pages</span>
    <span>Author</span>
    <span>Gender</span>
    <span>Ethnicity</span>
    <span>Region</span>
  </div>
{/if}

<style>
  /* Half Size */
  .play-heading-container-half {
    display: grid;
    grid-template-columns: 5% 35% 35% 15% 10%;
    text-align: left;
    padding-right: 4.2%;
    border-bottom: thin solid var(--secondary-color-dark);
    border-radius: 15px;
    background-color: var(--primary-color-dark);
  }
  .play-heading-container-half span {
    font-size: 14pt;
    padding: 5px;
    color: white;
  }
  /* Full Size */
  .play-heading-container-full {
    display: grid;
    grid-template-columns: 22% 7% 10% 6% 6% 18% 9% 9% 11%;
    text-align: left;
    padding: 0.7% 1.5% 0.7% 1%;
    border-bottom: thin solid var(--secondary-color-dark);
    background-color: var(--primary-color-dark);
    border-radius: 15px;
    box-shadow: 0px 0px 5px gray;
  }
  .play-heading-container-full span {
    font-size: 14pt;
    margin: 0% 1.4%;
    color: white;
  }
</style>
