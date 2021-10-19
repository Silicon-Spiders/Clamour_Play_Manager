<script>
  import Content from "$lib/components/content.svelte";
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
  <div slot="content">
    <div class="play-listing">asd</div>
    <div class="play-listing">asd</div>
    <div class="play-listing">asd</div>
    <div class="play-listing">asd</div>
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
  .play-listing {
    padding-left: 10px;
    padding-top: 15px;
    height: 50px;
    border-bottom: thin solid var(--secondary-color-dark);
  }
</style>
