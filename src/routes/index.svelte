<div class="loginPortal">
    <form action="POST">
        <h1>Login</h1>
        <div class="field">
            <label for="user">Username</label>
            <input name="user" id="user">
        </div>
        <div class="field">
            <label for="pass">Password</label>
            <input type="password" name="pass" id="pass">
        </div>
        <button type="submit">Login</button>
        
    </form>
    <a href="PLACEHOLDER/PUT-NEXT-PAGE-HERE">Temporary Link to another page (So that others can advance)</a>
</div>
<style>
    .loginPortal{
        background-color:lightgrey;
        border-radius: 10px;
        margin: auto;
        padding: 30px 0px;
        text-align: center;
        width: 700px;
    }
    .field{
        display: block;
    }
    .field input, .field label{
        margin: 10px;
        width: 300px;
    }
</style>