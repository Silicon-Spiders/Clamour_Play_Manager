<!-- This is the default layout, see here: https://kit.svelte.dev/docs#layouts -->

<script>
    let src="public/clamour-logo-600.jpg"
    // Getting file path for logo image
</script>

<header>
    <a href="/"><img {src} alt="Something"></a>
    <nav>
        <a href="/apply">APPLY</a>
        <a href="/login">LOGIN</a>
    </nav>
</header>

<main>
    <!-- Page content gets inserted here -->
    <slot></slot>
</main>

<footer>
    <nav id="footer">
        <!-- Add links in footer in the future -->
        <p>© Copyright 2017 - 2021 Clamour Theatre Company, Inc. | CTC. All Rights Reserved.</p>
    </nav>
</footer>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
    :global(body){
        font-family: 'Roboto', sans-serif;
        width: 100%;
        margin: auto;
        margin-bottom: 50px;
    }
    :global(textarea::placeholder){
        font-family: 'Roboto', sans-serif;
    }
    img{
        display: block;
        margin: auto;
    }
    nav{
        margin: 30px  auto;
        padding: 10px 0px 10px 0px;
        display: block;
        background-color: #ff2400;
        text-align: center;
    }
    nav a{
        display: inline-block;
        width: 100px;
        color: white;
        text-decoration: none;
        opacity: 100%;
        transition-property: opacity;
        transition-duration: 0.4s;
    }
    nav a:hover{
        opacity: 40%;
    }
    nav#footer{
        background-color: black;
        position: fixed;
        bottom: 0px;
        margin: 0px;
        width: 100%;
        height: 30px;
        color: white;
        font-size: 14px;
    }
</style>