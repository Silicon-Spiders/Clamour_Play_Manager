<div class="nav-bar">
  <div class="nav-links">
    <a href="./view-plays">View</a>
    <a href="./assign-plays">Assign</a>
    <a href="./account-creation">Manage Evaluators</a>
    <a id="logout" href="./account-creation">Logout</a>
  </div>
</div>
<div class="main">
  <div class="header">Elaine Smith</div>
  <div class="content">
    <slot />
  </div>
</div>

<style type="text/scss">
  @import "./portal-styles.scss";
</style>
