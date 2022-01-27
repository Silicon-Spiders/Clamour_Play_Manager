<script>

</script>

<body class="body-style">
  <div class="box">
    <h2><span>Change Account User and Pass</span></h2>
    <label> Username:
      <input class="textbox" type="text">
    </label>
    <br>
    <label> Password:
      <input class="textbox" type="text">
    </label>
    <button class="button">Submit</button>
  </div>
  <div class="box">
    <h2>Get Input Statements For DB</h2>
    <button>Download Text File</button>
  </div>
</body>

<style>
  .body-style {
    height: 100%;
    width: 100%;
  }
  .box {
    display: inline-block;
    margin: 5pt;
    padding: 20pt;
    background-color: lightgray;
    border-radius: 20pt;
  }
  .box label {
    display: inline-block;
    margin-top: 10pt;
  }
  .textbox {
    display: block;
    margin-top: 5pt;
    padding-left: 10pt;
    width: 125pt;
    height: 20pt;
    border-radius: 10pt;
  }
  .button {
    margin-left: 10pt;
    width: 80pt;
    height: 25pt;
    border-radius: 10pt;
  }
  .button:hover , .button:focus {
    background-color: gray;
  }
</style>