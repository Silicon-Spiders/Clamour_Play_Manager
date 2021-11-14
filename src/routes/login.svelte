<script>
  import { goto } from "$app/navigation";
  let rec = { user: "", pass: "" };
  async function submit(e) {
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
      const json = await res.json();
      console.log("json", json);
      if (json == true) {
        console.log("In json true if");
        goto("/portal/administrator/view-plays");
      } else {
        window.alert("Invalid Username/Password Credentials!");
      }
    }
  }
  // https://cojdev.github.io/lowpoly/
</script>

<svelte:head>
  <title>Login</title>
  <!-- RICARDO CARRASCO | USE CASE: LOGIN-->
  <!-- Login Page for Admins & Evaluators -->
</svelte:head>
<body>
  <div class="login-container">
    <div class="loginPortal">
      <form on:submit|preventDefault={submit} action="/api/login" method="POST">
        <h1>Login</h1>

        <label for="user">Username</label>
        <input type="text" id="user" bind:value={rec.user} />

        <label for="pass">Password</label>
        <input type="password" id="pass" bind:value={rec.pass} />

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</body>

<style>
  body {
    margin: 0px;
    background-image: url("public\images\red-low-poly.png");
    background-size: cover;
  }
  .login-container {
    position: absolute;
    top: 15%;
    left: 30%;
    background-color: rgba(0, 0, 0, 0.65);
    border-radius: 20px;
    box-shadow: 0px 0px 100px black;
    width: 40%;
    height: 70%;
  }
  .loginPortal {
    margin: auto;
    width: 50%;
    color: white;
    text-align: left;
    font-size: 3em;
  }
  .loginPortal h1 {
    margin: 20% auto 5%;
  }
  .loginPortal label {
    display: block;
  }
  .loginPortal input {
    display: block;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin-bottom: 5%;
  }
  button {
    margin-top: 10%;
    display: block;
    height: 35px;
    width: 50%;
    border-radius: 10px;
  }
</style>
