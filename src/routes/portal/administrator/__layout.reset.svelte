<script>
    import { goto } from "$app/navigation";
  
    import "$lib/portal-styles.scss";

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  
    async function clearCookies() {
      let logout = await fetch("/api/logout", {
        method: "POST"
      });
      location.reload()
    }
  
  </script>
  
  
  
  <div class="nav-bar">
    <div class="nav-links">
        <a href="/portal/administrator/view-plays"><span class="material-icons">source</span>View</a>
        <a href="/portal/administrator/assign-plays"><span class="material-icons">assignment</span>Assign</a>
        <a href="/portal/administrator/manage-evaluators"><span class="material-icons">manage_accounts</span>Manage Evaluators</a>
        <a id="logout" on:click={() => clearCookies()}><span class="material-icons"> logout </span>Logout</a>
    </div>
  </div>
  <body>
    <div class="redback">
      <div class="main">
        <div class="account">
          <span class="account-name" on:click={() => goto("/portal/administrator/admin-profile")}>
            {getCookie("user")}
            <span class="material-icons">account_circle</span>
          </span>
        </div>
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