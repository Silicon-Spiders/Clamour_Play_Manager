<script>
  import Icon from "./Icon.svelte";
</script>

<div class="long-instruction">
  <div class="icon">
    <Icon code="info" --icon-size="2em" />
  </div>
  <div>
    <slot />
  </div>
</div>

<style lang="scss">
  .long-instruction {
    .icon {
      width: 25%;
    }
    margin: 2vh 0%;
    display: flex;
    padding: 3%;
    background-color: #ffe5e1;
    border-radius: 10px;
  }
</style>
