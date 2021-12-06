<script>
  import PlayHeading from "$lib/components/playheading.svelte";
  import Play from "$lib/components/play.svelte";
</script>

<svelte:head>
  <title>Admin Menu</title>
</svelte:head>

<h1 class="header">View Plays</h1>

<div id="viewplays-toolbar">
  <label>Search: <input class="search-bar" type="search" /></label>
  <label for="sort">Sort By:</label>
  <select class="dropdown" name="sortBy" id="sort">
    <option />
    <option value="ratingHL">Rating: High to Low</option>
    <option value="ratingLH">Rating: Low to High</option>
    <option value="actorsHL">Actors: High to Low</option>
    <option value="actorsLH">Actors: Low to High</option>
    <option value="pagesHL">Pages: High to Low</option>
    <option value="pagesLH">Pages: Low to High</option>
  </select>
  <label for="toneFilter">Tone:</label>
  <select class="dropdown" name="toneFilter" id="tone">
    <option />

    <option value="comendy">Comedy</option>
    <option value="drama">Drama</option>
  </select>
  <label for="genderFilter">Gender:</label>
  <select class="dropdown" name="genderFilter" id="genderFilter">
    <option />
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>

<PlayHeading />
<Play>
  <span slot="title"><a href="./play-profile">Great Gatsby</a></span>
  <span slot="rating">9.5/10</span>
  <span slot="tone"> Drama </span>
  <span slot="actors">5</span>
  <span slot="pages">38</span>
  <span slot="authorName">Leonardo Dcaprio</span>
  <span slot="authorGender">Male</span>
  <span slot="authorEthnicity">--</span>
  <span slot="authorRegion"> Florida </span>
</Play>
<Play>
  <span slot="title">Great Gatsby </span>
  <span slot="rating">9.5/10</span>
  <span slot="tone"> Drama </span>
  <span slot="actors">5</span>
  <span slot="pages">38</span>
  <span slot="authorName">Leonardo Dcaprio</span>
  <span slot="authorGender">Male</span>
  <span slot="authorEthnicity">--</span>
  <span slot="authorRegion"> Florida </span>
</Play>
<Play>
  <span slot="title">Great Gatsby </span>
  <span slot="rating">9.5/10</span>
  <span slot="tone"> Drama </span>
  <span slot="actors">5</span>
  <span slot="pages">38</span>
  <span slot="authorName">Leonardo Dcaprio</span>
  <span slot="authorGender">Male</span>
  <span slot="authorEthnicity">--</span>
  <span slot="authorRegion"> Florida </span>
</Play>
