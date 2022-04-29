<script>
  import { browser } from "$app/env";
  import Alert from "$lib/components/Alert.svelte";
</script>

<slot />
{#if browser}
  <div class="alert">
    <Alert />
  </div>
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

  .alert {
    position: fixed;
    bottom: 175px;
  }
  :global(body) {
    font-family: "Roboto", sans-serif;
  }
</style>
