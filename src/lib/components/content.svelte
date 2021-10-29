<script>
  export let half;
  export let first;
  const display = "container" + (half ? " half" : "") + (first ? " first" : "");
  console.log(display);
</script>

<div class={display}>
  <div class="toolbar-container">
    <div class="toolbar">
      <slot name="toolbar"
        >ERROR: Something went wrong (Missing toolbar slot)</slot
      >
    </div>
  </div>
  <div class="headers">
    <slot name="headers">ERROR: Something went wrong (Missing header slot)</slot
    >
  </div>
  <div class="data">
    <slot name="data">ERROR: Something went wrong (Missing data slot)</slot>
  </div>
</div>

<style>
  .container {
    display: inline-block;
    height: 98%;
    width: 100%;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 5px 5px 10px var(--secondary-color-dark);
  }
  .half {
    width: 49%;
  }
  .first {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }
  .toolbar-container {
    background-color: var(--primary-color);
    height: 15%;
    line-height: 15%;
    border-bottom: medium solid var(--secondary-color-dark);
  }
  .toolbar {
    padding-top: 2.5%;
    padding-left: 2.5%;
  }
  .data {
    overflow: hidden scroll;
    background-color: var(--primary-color-light);
    height: 100%;
  }
</style>
