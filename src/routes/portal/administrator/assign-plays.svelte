<script>
  import Content from "$lib/components/content.svelte";
  import PlayHeading from "$lib/components/playheading.svelte";
  import Play from "$lib/components/play.svelte";
  let selectedPlays;
  $: console.log(selectedPlays);
</script>

<Content>
  <div class="toolbar" slot="toolbar">
    <label>Search: <input class="search-bar" type="search" /></label>
    <label for="toneFilter">Tone:</label>
    <select class="dropdown-field" name="tone" id="tone">
      <option value="comendy">Comedy</option>
      <option value="drama">Drama</option>
    </select>
  </div>
  <PlayHeading slot="headers" />
  <div slot="data">
    <Play bind:value={selectedPlays} id="one" checkbox>
      <div slot="title">Great Gatsby</div>
      <div slot="rating">9/10</div>
      <div slot="tone">Drama</div>
      <div slot="actors">3</div>
      <div slot="pages">37pg</div>
      <div slot="authorName">Leonardo</div>
      <div slot="authorGender">Male</div>
      <div slot="authorEthnicity">Caucasian</div>
      <div slot="authorRegion">(US)Florida</div>
    </Play>
    <Play id="two" checkbox>
      <div slot="title">Great Gatsby</div>
      <div slot="rating">9/10</div>
      <div slot="tone">Drama</div>
      <div slot="actors">3</div>
      <div slot="pages">37pg</div>
      <div slot="authorName">Leonardo</div>
      <div slot="authorGender">Male</div>
      <div slot="authorEthnicity">Caucasian</div>
      <div slot="authorRegion">(US)Florida</div>
    </Play>
  </div>
</Content>

<style>
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
