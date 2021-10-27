<script>
  export let id;
  export let checkbox;
  export let value;
</script>

<label for={id}>
  <div class="play-container">
    <span class:show={checkbox}>
      <input {id} bind:value type="checkbox" />
    </span>
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
</label>

<style>
  .play-container {
    display: grid;
    grid-template-columns: 2% 22% 7% 10% 6% 6% 18% 9% 9% 11%;
    text-align: left;
    padding: 1.5% 0% 1.5% 1%;
    border-bottom: thin solid var(--secondary-color-dark);
  }
  .play-container span {
    display: inline-block;
    font-size: 14pt;
    margin: 0% 1.4%;
  }
  .play-container input {
    display: none;
  }
  .show input {
    display: inline-block;
  }
</style>
