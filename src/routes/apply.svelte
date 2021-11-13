<script>
  import { bind } from "svelte/internal";
  async function fileUpload(file) {
    const fileResponse = await fetch("/submission/file.json", {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    const json = await fileResponse.json();
    console.log(json.body)

    const mailResponse = await fetch("/submission.json", {
      method: "POST",
      headers: {
        "Content-Type": json.title,
      },
      body: file,
    });
    const {path} = json; 
    console.log({ json });
  }
  async function submit(e) {
    const form = e.target;
    const fileInput = form.querySelector("input[type=file]");
    const [file] = fileInput.files;
    const path = file ? await fileUpload(file) : null;
    // save "path" with form-data
  }
</script>

<svelte:head>
  <title>Apply</title>
  <!-- Main Script Submission Page -->
</svelte:head>

<form on:submit|preventDefault={submit}>
  <table align="center" style="width: 90%;">
    <colgroup>
      <col span="1" style="width: 25%;" />
      <col span="1" style="width: 25%;" />
      <col span="1" style="width: 25%;" />
      <col span="1" style="width: 25%;" />
    </colgroup>

    <th align="left">
      <h4>Play Info</h4>
    </th>
    <th align="left">
      <h4>Personal Details</h4>
    </th>
    <th align="left">
      <h4>Contact Information</h4>
    </th>
    <th align="left">
      <h4>Finish & Submit</h4>
    </th>
    <tr>
      <td class="card">
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
        <br>

        <label for="tone">Tone of the Play: </label>
        <select name="tone" id="tone">
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
        </select>
      </td>
      <td class="card">
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
      </td>
      <td class="card">
        <label><span>First Name:</span><br><input type="text" name="fname"></label><br>
        <label><span>Last Name:</span><br><input type="text" name="lname"></label><br>
        <label><span>Country:</span><br><input type="text" name="counrty"></label><br>
        <label><span>Street Address:</span><br><input type="text" name="address"></label><br>
        <label><span>City:</span><br><input type="text" name="city"></label><br>
        <label><span>Zip:</span><br><input type="text" name="zip"></label><br>
        <label><span>Primary Phone Number:</span><br><input type="text" name="phone"></label><br>
        <label><span>Email:</span><br><input name="email" type="email"></label><br>
        <label><span>Meeting Preference:</span><br>
        <select name="meet_preferences">
          <option value="physical">In person</option>
          <option value="online">Online</option>
        </select>
        </label>
      </td>
      <td class="card">
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
        <label for="email">Email: </label>
        <input id="email" type="email" />
        <br />
        <button type="submit">Submit</button>
      </td>
    </tr>
  </table>
</form>

<style>
  .card {
    border-radius: 25px;
    background: #ffadad;
    padding: 20px;
    width: 25%;
    height: 150px;
  }
  .card input{
    padding-left: 20pt;
  }
</style>
