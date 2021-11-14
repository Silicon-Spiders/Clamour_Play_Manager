<script>
  import Content from "$lib/components/content.svelte";
  import Play from "$lib/components/play.svelte";
  import Playheading from "$lib/components/playheading.svelte";
  import PlayHeading from "$lib/components/playheading.svelte";
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
    <Playheading>
      <span>Great Gatsby</span>
    </Playheading>
    <Play checkbox>
      <span slot="title">Great Gatsby</span>
      <span slot="rating">9/10</span>
      <span slot="tone">Drama</span>
      <span slot="actors">3</span>
      <span slot="pages">37pg</span>
      <span slot="authorFirstName">Leonardo</span>
      <span slot="authorLastName">Dicaprio</span>
      <span slot="authorGender">Male</span>
      <span slot="authorEthnicity">Caucasian</span>
      <span slot="authorRegion">(US)Florida</span>
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
