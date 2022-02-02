<script>
  import { goto } from "$app/navigation";

  export let evaluator = undefined;
  const { _id: id, firstName, lastName, email, phone } = evaluator;
</script>

<div class="evaluator" on:click>
  <span id="name">{firstName} {lastName}</span>
  <span id="email">{email}</span>
  <span id="phone">{phone}</span>
</div>

<style lang="scss">
  .evaluator {
    display: flex;
    align-items: center;
    font-size: 14pt;
    padding: 1% 2%;
    border-bottom: thin solid var(--secondary-color-dark);
    transition: all 0.3s ease-out;
    &:hover {
      background-color: white;
      cursor: pointer;
    }
  }
  #name {
    flex-basis: 30%;
  }
  #email {
    flex-basis: 30%;
  }
  #phone {
    flex-basis: 30%;
  }
</style>
