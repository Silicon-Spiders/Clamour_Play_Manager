<script>
  import Icon from "$lib/components/Icon.svelte";
  // Needs a way to get list of all assigned plays for the evaluator that is logged in
  // Not all data, just meta-info:  _______________
</script>

<h1 class="header">Assigned Plays</h1>

<div class="assigned-plays-heading">
  <span class="title">Title</span>
  <span class="tone">Tone</span>
  <span class="pages">Pages</span>
  <span class="status">Status</span>
</div>

<!-- <a href="{play.id}-profile"> -->
<div class="play-container">
  <span class="title">Title</span>
  <span class="tone">Tone</span>
  <span class="pages">Pages</span>
  <span class="status">Status</span>
</div>

<!-- </a> -->
<style lang="scss">
  .play-container {
    display: flex;
    padding: 0.5% 3%;
    border-bottom: thin solid var(--secondary-color-dark);
    transition: all 0.3s ease-out;
    &:hover {
      background-color: white;
    }
    span {
      font-size: 14pt;
    }
  }

  .assigned-plays-heading {
    display: flex;
    padding: 0.5% 3%;
    background-color: var(--primary-color-dark);
    box-shadow: 0px 0px 5px gray;
    border-radius: 15px;
    span {
      font-size: 14pt;
      color: white;
    }
  }
  .title {
    flex-grow: 8;
  }
  .tone {
    flex-grow: 1;
  }
  .pages {
    flex-grow: 1;
  }
  .status {
    flex-grow: 1;
  }
</style>
