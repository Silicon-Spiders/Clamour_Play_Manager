<script>
  import "$lib/portal-styles.scss";
</script>

<div class="nav-bar">
  <div class="nav-links">
    <a href="./view-plays"><span class="material-icons">source</span>View</a>
    <a href="./assign-plays"
      ><span class="material-icons">assignment</span>Assign</a
    >
    <a href="./account-creation"
      ><span class="material-icons">manage_accounts</span>Manage Evaluators</a
    >
    <a id="logout" href="/">
      <span class="material-icons"> logout </span>Logout</a
    >
  </div>
</div>
<body class="redback">
  <div class="main">
    <div class="account">
      <span class="account-name">
        Elaine Smith
        <span class="material-icons">account_circle</span>
      </span>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</body>

<style>
  .redback {
    background-color: #f44336;
  }
</style>
