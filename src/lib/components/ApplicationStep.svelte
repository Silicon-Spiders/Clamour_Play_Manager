<script>
  import LayoutGrid from "@smui/layout-grid";
</script>

<div class="container">
  <LayoutGrid>
    <slot />
  </LayoutGrid>
</div>
<div class="buttons">
  <slot name="previous">
    <div />
  </slot>
  <slot name="next">
    <div />
  </slot>
</div>

<style>
  .container {
    height: 80vh;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>
