<script context="module">
  export const alert = {};
</script>

<script>
  import Snackbar from "@smui/snackbar";
  import { Label } from "@smui/common";

  let sb;
  let message;
  let surface$class;
  let icon;
  alert.show = function (msg, type = "info") {
    message = msg;
    surface$class = type;
    icon = type;
    sb.open();
  };
</script>

<Snackbar bind:this={sb} {surface$class}>
  <i class="material-icons">{icon}</i>
  <Label>{message}</Label>
</Snackbar>

<style lang="scss">
  i.material-icons {
    color: white;
  }
  :global {
    .mdc-snackbar__surface {
      padding-inline: 1rem;
      position: relative;
      bottom: 4rem;
      &.error {
        background-color: red;
      }
      &.info {
        background-color: gray;
      }
    }
  }
</style>
