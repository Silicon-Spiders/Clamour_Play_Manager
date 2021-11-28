<script>
  import { bind } from "svelte/internal";
  async function fileUpload(file, form) {
    const fileResponse = await fetch("/submission/file.json", {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    const json = await fileResponse.json();
    return json.path;

    
    const {path} = json; 
    console.log({ json });
  }
  async function formUpload(form) {
    const formResponse = await fetch("/submission.json", {
      method: "POST",
      headers: {
        "Content-Type": form.type,
      },
      body: form,
    });

    const json = await formResponse.json();

    return json.req;
  }
  async function submit(e) {
    const form = e.target;
    const fileInput = form.querySelector("input[type=file]");
    const [file] = fileInput.files;
    const path = file ? await fileUpload(file, form) : null;
    // save "path" with form-data
    console.log(path);
    console.log(form);
    var newForm = new FormData(form.value);
    newForm.append("path", path);
    newForm.delete("play_pdf");
    console.log(newForm.get("path"));
    const alert = await formUpload(newForm);
    console.log(alert);
  }
  import OutsideLayout from "./outside-layout.svelte";
</script>

<svelte:head>
  <title>Apply</title>
  <!-- Main Script Submission Page -->
</svelte:head>

<OutsideLayout/>

<form on:submit|preventDefault={submit}>
  <div class="wrap" align="center" style="width: 100%;">
    <div class="card" span="1">
      <h3>Play Info</h3>
      <label for="play_pdf">Play PDF:</label>
        <input
          type="file"
          accept="application/pdf"
        />
        <br>

        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title" />
        <br>

        <label for="actor_count">Actors:</label><br>
        <input type="number" id="actor_count" name="actor_count" />
        <br>

        <label for="actor_explain">Actor Count Explanation:</label>
        <br>
        <textarea
          id="actor_explain"
          name="actor_explain"
          cols="30%"
          rows="10"
          placeholder="Please explain why this many actors can perform this play."
        />
    </div>
    <div class="card" span="1">
      <h3>Personal Details</h3>
      <label for="prof_intro">Professional Introduction:</label>
        <br />
        <textarea
          name="prof_intro"
          id="prof_intro"
          cols="30%"
          rows="7"
          placeholder="What is you professional background?"
        />
        <br />
        <label for="person_intro">Personal Introduction:</label>
        <br />
        <textarea
          name="person_intro"
          id="person_intro"
          cols="30%"
          rows="7"
          placeholder="Tell us about yourself."
        />
    </div>
    <div class="card" span="1">
      <h3>Contact Information</h3>
      <label><span>First Name:</span><br><input type="text" name="fname"></label><br>
        <label><span>Last Name:</span><br><input type="text" name="lname"></label><br>
        <label><span>Country:</span><br><input type="text" name="counrty"></label><br>
        <label><span>Street Address:</span><br><input type="text" name="address"></label><br>
        <label><span>City:</span><br><input type="text" name="city"></label><br>
        <label><span>Zip:</span><br><input type="text" name="zip"></label><br>
        <label><span>Primary Phone Number:</span><br><input type="text" name="phone"></label><br>
        <label><span>Email:</span><br><input name="email" type="email"></label><br>
        <label><span>Meeting Preference:</span>
        <select name="meet_preferences">
          <option value="physical">In person</option>
          <option value="online">Online</option>
        </select>
        </label>
    </div>
    <div class="card" span="1">
      <h3>Finish & Submit</h3>
      <label for="synopsis">Synopsis:</label>
        <br />
        <textarea
          name="synopsis"
          id="synopsis"
          cols="30%"
          rows="6"
          placeholder="Write a brief synopsis of you play."
        />
        <br />
        <label for="play_future">Play Improvements:</label>
        <br />
        <textarea
          name="play_future"
          id="play_future"
          cols="30%"
          rows="6"
          placeholder="Where do you think you can improve this play and why?"
        />
        <br />
        <button type="submit">Submit</button>
    </div>
  </div>
</form>

<style>
  .card {
    border-radius: 25px;
    background: #ffadad;
    padding: 10px;
    margin: 5px;
    display: inline-table;
    width: 300px;
    min-height: 420px;
  }
  .card textarea {
    resize: vertical;
  }
  .card input{
    margin-left: 20pt;
    width: 80%;
  }
  .wrap {
    padding: 20px;
}
</style>
