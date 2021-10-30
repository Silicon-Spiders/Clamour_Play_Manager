<script>
  import PlayHeading from "$lib/components/playheading.svelte";
  import Play from "$lib/components/play.svelte";
  let selectedPlays;
  $: console.log(selectedPlays);
</script>

<div class="toolbar">
  <label>Search: <input class="search-bar" type="search" /></label>
  <label for="toneFilter">Tone:</label>
  <select class="dropdown-field" name="tone" id="tone">
    <option value="comendy">Comedy</option>
    <option value="drama">Drama</option>
  </select>
</div>
<PlayHeading half />
<label for="id">
  <Play half checkbox>
    <span slot="checkbox">
      <input name="assignedPlays" id="id" type="checkbox" />
    </span>
    <span slot="title">Great Gatsby</span>
    <span slot="tone">Drama</span>
    <span slot="actors">3</span>
    <span slot="pages">37pg</span>
    <span slot="authorName">Leonardo</span>
  </Play>
</label>

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
