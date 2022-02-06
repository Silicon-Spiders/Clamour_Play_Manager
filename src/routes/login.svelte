<script>
  import { goto } from "$app/navigation";
  import Textfield from "@smui/textfield";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button from "@smui/button";
  import "$lib/global.scss";

  let rec = { user: "", pass: "" };

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkRedirect(cookie) {
    if (cookie == "admin") {
      goto("/portal/administrator/view-plays");
    } else if (cookie == "evaluator") {
      goto("/portal/evaluator/main");
    }
  }

  async function submit(e) {
    // console.log(rec);
    const form = e.target;
    const { action, method } = form;
    const res = await fetch(action, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rec),
    });
    if (res.ok) {
      checkRedirect(getCookie("role"));
    } else {
      window.alert("Invalid Username/Password Credentials!");
    }
  }
  // https://cojdev.github.io/lowpoly/
</script>

<svelte:head>
  <title>Login</title>
  <!-- RICARDO CARRASCO | USE CASE: LOGIN-->
  <!-- Login Page for Admins & Evaluators -->
</svelte:head>
<div class="login">
  <div class="sideimage" />
  <form on:submit|preventDefault={submit} action="./api/login" method="POST">
    <LayoutGrid style="width: 100%">
      <Cell span={12}>
        <img src="clamour-logo-600.jpg" alt="Clamour logo" />
      </Cell>
      <Cell span={12}>
        <label for="user">Username</label>
        <Textfield variant="outlined" id="user" bind:value={rec.user} required />
      </Cell>
      <Cell span={12}>
        <label for="pass">Password</label>
        <Textfield id="pass" variant="outlined" type="password" bind:value={rec.pass} required />
      </Cell>
      <Cell span={12}>
        <Button variant="outlined" type="submit">Login</Button>
      </Cell>
    </LayoutGrid>
  </form>
</div>

<style lang="scss">
  @import "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp";

  .login {
    display: flex;
    height: 100vh;
    width: 100vw;
  }
  .sideimage {
    flex-basis: 60vw;
    background-image: url("/src/images/red-low-poly.png");
  }
  form {
    display: flex;
    align-items: center;
    flex-basis: 40vw;
    margin: 0px 5vw;
  }
</style>
