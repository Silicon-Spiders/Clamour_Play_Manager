<script>
  import { bind } from "svelte/internal";
  import StepWizard from "svelte-step-wizard";

  import OutsideLayout from "../lib/components/layouts/Outside-layout.svelte";
  import ApplicationProgress from "$lib/components/apply/ApplicationProgress.svelte";

  let formFile;
  let formDataBind = {
    title: '',
    actors: '',
    actor_explain: '',
    prof_intro: '',
    person_intro: '',
    fname: '',
    lname: '',
    country: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    email: '',
    meet_pref: '',
    synopsis: '',
    play_future: '',
    path: '',
  }

  async function fileUpload(file, form) {
    const fileResponse = await fetch("server/submission/file.json", {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    const json = await fileResponse.json();
    return json.path;
  }
  async function formUpload(form) {
    const formResponse = await fetch("server/submission.json", {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
    });

    const json = await formResponse.json();

    return json.req;
  }

  async function submit(e) {
    const form = formDataBind;
    const [file] = formFile;
    const path = file ? await fileUpload(file, form) : null;
    form.path = path;
    const alert = await formUpload(form);
    console.log(alert.body.message);
  }
  let finish = false;
</script>

<svelte:head>
  <title>Apply</title>
  <!-- Main Script Submission Page -->
</svelte:head>

<div class="apply">
  <div class="sideimage" style="flex-basis: {finish ? '100vw' : '40vw'}">
    <div class="sideimage-successtext" style="opacity: {finish ? '1' : '0'}">
      <h1>Thank you!</h1>
      <h2>You should recieive an email confirming your application</h2>
    </div>
  </div>
  <form
    on:submit|preventDefault={submit}
    style="display: {finish ? 'none' : 'block'}"
  >
    <StepWizard initialStep={1}>
      <ApplicationProgress />
      <StepWizard.Step num={1} let:nextStep>
        <div class="step">
          <h2>Play Info</h2>
          <label for="play_pdf">Play PDF:</label>
          <input id="play_pdf" type="file" accept="application/pdf" bind:files={formFile} />
          <br />

          <label for="title">Title:</label><br />
          <input type="text" id="title" name="title" bind:value={formDataBind.title} />
          <br />

          <label for="actor_count">Actors:</label><br />
          <input type="number" id="actor_count" name="actor_count" bind:value={formDataBind.actors} />
          <br />

          <label for="actor_explain">Actor Count Explanation:</label>
          <br />
          <textarea
            id="actor_explain"
            name="actor_explain"
            cols="30%"
            rows="10"
            placeholder="Please explain why this many actors can perform this play."
            bind:value={formDataBind.actor_explain}
          />
        </div>

        <div class="step-btns">
          <div />
          <button on:click={nextStep}>Next</button>
        </div>
      </StepWizard.Step>
      <StepWizard.Step num={2} let:previousStep let:nextStep>
        <div class="step">
          <h2>Personal Details</h2>
          <label for="prof_intro">Professional Introduction:</label>
          <br />
          <textarea
            name="prof_intro"
            id="prof_intro"
            cols="30%"
            rows="7"
            placeholder="What is you professional background?"
            bind:value={formDataBind.prof_intro}
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
            bind:value={formDataBind.person_intro}
          />
        </div>
        <div class="step-btns">
          <button on:click={previousStep}>Previous</button>
          <button on:click={nextStep}>Next</button>
        </div>
      </StepWizard.Step>
      <StepWizard.Step num={3} let:previousStep let:nextStep>
        <div class="step">
          <h2>Contact Information</h2>
          <label
            ><span>First Name:</span><br /><input
              type="text"
              name="fname"
              bind:value={formDataBind.fname}
            /></label
          ><br />
          <label
            ><span>Last Name:</span><br /><input
              type="text"
              name="lname"
              bind:value={formDataBind.lname}
            /></label
          ><br />
          <label
            ><span>Country:</span><br /><input
              type="text"
              name="country"
              bind:value={formDataBind.country}
            /></label
          ><br />
          <label
            ><span>Street Address:</span><br /><input
              type="text"
              name="address"
              bind:value={formDataBind.address}
            /></label
          ><br />
          <label
            ><span>City:</span><br /><input type="text" name="city" bind:value={formDataBind.city} /></label
          ><br />
          <label><span>Zip:</span><br /><input type="text" name="zip" bind:value={formDataBind.zip} /></label
          ><br />
          <label
            ><span>Primary Phone Number:</span><br /><input
              type="text"
              name="phone"
              bind:value={formDataBind.phone}
            /></label
          ><br />
          <label
            ><span>Email:</span><br /><input name="email" type="email" bind:value={formDataBind.email} /></label
          ><br />
          <label
            ><span>Meeting Preference:</span>
            <select name="meet_preferences" bind:value={formDataBind.meet_pref} >
              <option value="physical">In person</option>
              <option value="online">Online</option>
            </select>
          </label>
        </div>

        <div class="step-btns">
          <button on:click={previousStep}>Previous</button>
          <button on:click={nextStep}>Next</button>
        </div>
      </StepWizard.Step>
      <StepWizard.Step num={4} let:previousStep let:nextStep>
        <div class="step">
          <h2>Finish & Submit</h2>
          <label for="synopsis">Synopsis:</label>
          <br />
          <textarea
            name="synopsis"
            id="synopsis"
            cols="30%"
            rows="6"
            placeholder="Write a brief synopsis of you play."
            bind:value={formDataBind.synopsis}
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
            bind:value={formDataBind.play_future}
          />
          <br />
        </div>

        <div class="step-btns">
          <button on:click={previousStep}>Previous</button>
          <button on:click={() => (finish = true)} type="submit">Submit</button>
        </div>
      </StepWizard.Step>
    </StepWizard>
  </form>
</div>

<style lang="scss">
  .apply {
    display: flex;
    height: 100vh;
  }
  .sideimage {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-basis: 40vw;
    background-image: url("/src/images/red-low-poly.png");
    transition: all 2s ease;
    &-successtext {
      color: white;
      opacity: 0;
      transition: all 1.5s ease-in;
    }
  }
  form {
    padding: 15vh 0px;
    flex-basis: 60vw;
    margin: 0px 5vw;
  }

  .step {
    margin: 8vh 0px;
    height: 50vh;
    &-btns {
      display: flex;
      justify-content: space-between;
      button {
        background-color: white;
        cursor: pointer;
        border-radius: 5px;
        border: solid 3px rgba(128, 128, 128, 0.6);
        padding: 1%;
        width: 7vw;
        font-size: 11pt;
        transition: all 0.4s ease;
      }
      button:hover {
        background-color: rgba(128, 128, 128, 0.2);
      }
    }
  }
</style>
