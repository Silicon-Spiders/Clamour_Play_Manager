<div class="container">
  <div class="toolbar-container">
    <div class="toolbar">
      <slot name="toolbar" />
    </div>
  </div>
  <div class="headers">
    <slot name="headers">Oh No! Something went wrong (Error with loading data)</slot>
  </div>
  <div class="data">
    <slot name="data">Oh No! Something went wrong (Error with loading data)</slot>
  </div>
</div>

<style>
  .container {
    height: 98%;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 5px 5px 10px var(--secondary-color-dark);

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
