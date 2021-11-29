<script>
  export let half;
</script>

{#if half}
  <div class="play-container-half">
    <span class="checkbox">
      <slot name="checkbox" />
    </span>
    <span>
      <slot name="title" />
    </span>
    <span>
      <slot name="authorName" />
    </span>
    <span>
      <slot name="tone" />
    </span>
    <span>
      <slot name="pages" />
    </span>
  </div>
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
    grid-template-columns: 5% 35% 35% 15% 10%;
    text-align: left;
    padding: 5px;
  }
  .play-container-half:hover {
    background-color: lightgray;
    border-radius: 5px;
  }
  .play-container-half span {
    margin: 0.7% 1.4% 1.4% 0%;
  }
  .checkbox {
    text-align: right;
  }
</style>
