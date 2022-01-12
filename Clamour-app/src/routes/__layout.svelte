<header>
    <nav>
      <a href="/apply">APPLY</a>
      <a href="/login">LOGIN</a>
    </nav>
  </header>

  <slot></slot>
  
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");
    :global(body) {
      font-family: "Roboto", sans-serif;
      width: 100vw;
      margin: auto;
    }
    :global(textarea::placeholder) {
      font-family: "Roboto", sans-serif;
    }
    img {
      display: block;
      max-width: 100%;
      height: auto;
      margin: auto;
    }
    nav {
      position: absolute;
      padding: 10px 0px 10px 0px;
      width: 100vw;
      background-color: #ff2400;
      text-align: center;
    }
    nav a {
      display: inline-block;
      width: 100px;
      color: white;
      text-decoration: none;
      opacity: 100%;
      transition-property: opacity;
      transition-duration: 0.4s;
    }
    nav a:hover {
      opacity: 40%;
    }
    nav#footer {
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