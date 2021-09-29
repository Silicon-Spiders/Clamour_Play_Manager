<svelte:head>
    <title>Login</title>
    <!-- Login Page for Admins & Evaluators -->
</svelte:head>

<div class="loginPortal">
    
    <form action="POST">
        <h2>Login</h2>
        <div class="field">
            <label for="user">Username:</label>
            <input name="user" id="user">
        </div>
        <div class="field">
            <label for="pass">Password:</label>
            <input type="password" name="pass" id="pass">
        </div>
        <button type="submit">Login</button>
    </form>

    <!-- (To whoever works on admin page) Change placeholder link/href to /admin -->
    <a href="/administrator/main">Temporary Link to another page (So that others can advance)</a> <br>
    
    <!-- (To whoever works on evaluator page) Change placeholder link/href to /evaluator-->
    <a href="/evaluator/main">2nd Temporary Link to another page (So that others can advance)</a>

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