<script>
    import { goto } from '$app/navigation';
    let rec = { user: "", pass: "" };
    async function submit(e) {
        const form = e.target;
        const {action, method} = form;
        const res = await fetch(action, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rec),
        });
        if(res.ok) {
            const json = await res.json();
            console.log("json", json);
            if(json == true){
                console.log("In json true if");
                goto("/portal/administrator/view-plays");
            }
            else{
                window.alert("Invalid Username/Password Credentials!");
            }
        }
  }
</script>

<svelte:head>

    <title>Login</title>
    <!-- Login Page for Admins & Evaluators -->
</svelte:head>
<div class="loginPortal">
    <form on:submit|preventDefault={submit} action="/api/login" method="POST">
        <h2>Login</h2>
        <div class="field">
            <label for="user">Username:</label>
            <input type="text" id="user" bind:value={rec.user}>
        </div>
        <div class="field">
            <label for="pass">Password:</label>
            <input type="password" id="pass" bind:value={rec.pass}>
        </div>
        <button type="submit">Login</button>
    </form>

    <!-- (To whoever works on evaluator page) Change placeholder link/href to /evaluator-->
    <a href="/evaluator/main">Temporary Link to another page (So that others can advance)</a>

</div>

<style>
    .loginPortal{
        background-color:lightgrey;
        border-radius: 10px;
        margin: 60px auto;
        padding: 10px 0px;
        text-align: center;
        width: 700px;
        vertical-align: middle;
    }
    .field{
        display: block;
    }
    .field input, .field label{
        margin: 10px;
        width: 200px;
    }
    button{
        /* Style button */
        margin: 15px;
    }
</style>