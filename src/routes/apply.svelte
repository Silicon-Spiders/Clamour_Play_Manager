<svelte:head>
  <title>Apply</title>
  <!-- Main Script Submission Page -->
</svelte:head>

<form>
  <table align="center" style="width: 90%;">
    <colgroup>
      <col span="1" style="width: 30%;" />
      <col span="1" style="width: 30%;" />
      <col span="1" style="width: 30%;" />
    </colgroup>

    <th align="left">
      <h4>Play Info</h4>
    </th>
    <th align="left">
      <h4>Personal Details</h4>
    </th>
    <th align="left">
      <h4>Finish & Submit</h4>
    </th>
    <tr>
      <td>
        <label for="play_pdf">Play PDF:</label>
        <input type="file" id="play_pdf" name="play_pdf" accept="application/pdf" />
        <br />

        <label for="title">Title:</label>
        <input type="text" id="title" name="title" />
        <br />

        <label for="actor_count">Actors:</label>
        <input type="number" id="actor_count" name="actor_count" />
        <br />

        <label for="actor_explain">Actor Count Explanation:</label>
        <br />
        <textarea
          id="actor_explain"
          name="actor_explain"
          cols="30%"
          rows="10"
          placeholder="Please explain why this many actors can perform this play."
        />
        <br />

        <label for="meet_preference">Meeting Preference: </label>
        <select name="meet_preferences" id="meet_preferences">
          <option value="physical">In person</option>
          <option value="online">Online</option>
        </select>
        <br />

        <label for="tone">Tone of the Play: </label>
        <select name="tone" id="tone">
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
        </select>
      </td>
      <td>
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
        <textarea name="person_intro" id="person_intro" cols="30%" rows="7" placeholder="Tell us about yourself." />
      </td>
      <td>
        <label for="synopsis">Synopsis:</label>
        <br />
        <textarea name="synopsis" id="synopsis" cols="30%" rows="6" placeholder="Write a brief synopsis of you play." />
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
