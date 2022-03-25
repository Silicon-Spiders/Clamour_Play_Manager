<script>
  export let error = undefined;
</script>

<div>
  {error ?? ""}
</div>

<style>
  div {
    color: red;
  }
</style>
