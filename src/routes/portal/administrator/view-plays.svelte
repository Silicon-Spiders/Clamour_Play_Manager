<script>
  import Content from "$lib/components/content.svelte";
  import PlayHeading from "$lib/components/playheading.svelte";
  import Play from "$lib/components/play.svelte";
</script>

<svelte:head>
  <title>Admin Menu</title>
</svelte:head>

<Content first>
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
    <Play>
      <span slot="title"> Great Gatsby </span>
      <span slot="rating"> 9.5/10 </span>
      <span slo="tone"> Drama </span>
      <span slot="actors"> 5 </span>
      <span slot="pages"> 38 </span>
      <span slot="authorName">Leonardo Dcaprio</span>
      <span slot="authorGender"> Male </span>
      <span slot="authorEthnicity">--</span>
      <span slot="authorRegion"> Florida </span>
    </Play>
  </div>
</Content>
