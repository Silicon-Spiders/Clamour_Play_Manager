<script>
  import { activeTab } from "$lib/stores";
  import { applicationTabs } from "$lib/ui/common";
  import Button from "@smui/button";
  import LayoutGrid from "@smui/layout-grid";
  export let tab;
</script>

{#if applicationTabs[tab] === $activeTab}
  <div class="container">
    <LayoutGrid>
      <slot />
    </LayoutGrid>
  </div>
  <div class="buttons">
    {#if tab - 1 !== -1}
      <Button variant="outlined" on:click$preventDefault={() => ($activeTab = applicationTabs[tab - 1])}>
        Previous
      </Button>
    {:else}
      <div />
    {/if}

    {#if tab === applicationTabs.length - 1}
      <Button variant="outlined" type="submit">Finish and Submit</Button>
    {:else}
      <Button variant="outlined" on:click$preventDefault={() => ($activeTab = applicationTabs[tab + 1])}>
        Next
      </Button>
    {/if}
  </div>
{/if}

<style>
  .container {
    height: 80vh;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>
