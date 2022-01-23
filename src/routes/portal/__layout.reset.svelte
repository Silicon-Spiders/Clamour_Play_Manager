<script>
  import { goto } from "$app/navigation";

  import "$lib/portal-styles.scss";

  let userRole = "admin";

</script>



<div class="nav-bar">
  <div class="nav-links">
    {#if userRole == "admin"}
      <a href="/portal/administrator/view-plays"><span class="material-icons">source</span>View</a>
      <a href="/portal/administrator/assign-plays"><span class="material-icons">assignment</span>Assign</a>
      <a href="/portal/administrator/account-creation"><span class="material-icons">manage_accounts</span>Manage Evaluators</a>
    {:else if userRole == "evaluator"}
      <a href="/portal/evaluator/main">Plays</a>
      <!-- <a href="../evaluator/assign-plays">Assign</a> -->
    {/if}
    <a id="logout" href="/"><span class="material-icons"> logout </span>Logout</a>
  </div>
</div>
<body>
  <div class="redback">
    <div class="main">
      {#if userRole == "admin"}
        <div class="account" on:click={() => goto("/portal/administrator/admin-profile")}>
          <span class="account-name">
            Elaine Smith
            <span class="material-icons">account_circle</span>
          </span>
        </div>
      {:else if userRole == "evaluator"}
        <div class="account" on:click={() => goto("../evaluator/main")}>
          <span class="account-name">
            Evaluator
            <span class="material-icons">account_circle</span>
          </span>
        </div>
      {/if}
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</body>

<style>
  .redback {
    background-color: #f44336;
    margin: 0px;
    height: 100%;
    font-family: "Roboto", sans-serif;
  }
  .account-name:hover {
    background-color: black;
    cursor: pointer;
  }
</style>
