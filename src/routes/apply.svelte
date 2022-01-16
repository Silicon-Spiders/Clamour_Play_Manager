<script>
  import { bind } from "svelte/internal";
  import StepWizard from "svelte-step-wizard";

  import OutsideLayout from "../lib/components/layouts/Outside-layout.svelte";
  import ApplicationProgress from "$lib/components/apply/ApplicationProgress.svelte";

  let formFile;
  let formDataBind = {
    title: "",
    actors_men: 0,
    actors_women: 0,
    actors_neutral: 0,
    actor_explain: "",
    person_web: "",
    work_web: "",
    prof_intro: "",
    person_intro: "",
    fname: "",
    mname: "",
    lname: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    province: "",
    postal_code: "",
    phone: "",
    email: "",
    meet_pref: "",
    synopsis: "",
    play_future: "",
    path: "",
  };
  let totalActors = 0;

  function updateTotalAct() {
    totalActors =
      formDataBind.actors_men +
      formDataBind.actors_women +
      formDataBind.actors_neutral;
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
        "Content-Type": "application/json",
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
    console.log(alert);
    console.log(alert.message);
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
          <div class="scroll">
            <label for="play_pdf">Play PDF:</label>
            <input
              class="filebox"
              id="play_pdf"
              type="file"
              accept="application/pdf"
              bind:files={formFile}
              required
            />
            <br />
  
            <label for="title">Title:</label><br />
            <input
              type="text"
              id="title"
              name="title"
              bind:value={formDataBind.title}
              required
            />
            <br />
            <div>
              <h3>Actors (Total: {totalActors})</h3>
              <span class="tooltip"
                >Enter how many actors will be required to complete this play.</span
              >
            </div>
            <div class="numbers">
              <label for="actor_count">Men:</label>
              <input
                type="number"
                id="actor_count"
                min="0"
                name="actor_count"
                bind:value={formDataBind.actors_men}
                on:change={updateTotalAct}
              />
              <br />
              <label for="actor_count">Women:</label>
              <input
                type="number"
                id="actor_count"
                min="0"
                name="actor_count"
                bind:value={formDataBind.actors_women}
                on:change={updateTotalAct}
              />
              <br />
              <label for="actor_count">Neutral:</label>
              <input
                type="number"
                id="actor_count"
                min="0"
                name="actor_count"
                bind:value={formDataBind.actors_neutral}
                on:change={updateTotalAct}
              />
            </div>
  
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
        </div>

        <div class="step-btns">
          <div />
          <button on:click={nextStep}>Next</button>
        </div>
      </StepWizard.Step>
      <StepWizard.Step num={2} let:previousStep let:nextStep>
        <div class="step">
          <h2>Personal Details</h2>
          <div class="scroll">
            <label>
              <span>Work Website:</span>
              <input type="text" name="work_web" bind:value={formDataBind.work_web}>
            </label>
            <br><br>
            <label>
              <span>Personal Website:</span>
              <input type="text" name="person_web" bind:value={formDataBind.person_web}>
            </label>
            <br><br>
            <label for="prof_intro">Professional Introduction:</label>
            <br />
            <textarea
              name="prof_intro"
              id="prof_intro"
              cols="50%"
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
              cols="50%"
              rows="7"
              placeholder="Tell us about yourself."
              bind:value={formDataBind.person_intro}
            />
          </div>
        </div>
        <div class="step-btns">
          <button on:click={previousStep}>Previous</button>
          <button on:click={nextStep}>Next</button>
        </div>
      </StepWizard.Step>
      <StepWizard.Step num={3} let:previousStep let:nextStep>
        <div class="step">
          <h2>Contact Information</h2>
          <div class="table">
            <div>
              <label>
                <span>First Name:</span><br />
                <input
                  type="text"
                  name="fname"
                  bind:value={formDataBind.fname}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <span>Middle Name:</span><br />
                <input
                  type="text"
                  name="mname"
                  bind:value={formDataBind.mname}
                />
              </label>
            </div>
            <div>
              <label>
                <span>Last Name:</span><br />
                <input
                  type="text"
                  name="lname"
                  bind:value={formDataBind.lname}
                  required
                />
              </label>
            </div>
          </div>
          <div class="table">
            <div>
              <label>
                <span>Country:</span><br />
                <input
                type="text"
                name="country"
                bind:value={formDataBind.country}
                />
              </label>
            </div>
            <div>
              <label>
                <span>State:</span><br />
                <input
                  type="text"
                  name="state"
                  bind:value={formDataBind.state}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <span>City:</span><br />
                <input
                  type="text"
                  name="city"
                  bind:value={formDataBind.city}
                  required
                />
              </label>
            </div>
          </div>
          <div class="table">
            <div>
              <label>
                <span>Address 1:</span><br />
                <input
                  type="text"
                  name="address"
                  bind:value={formDataBind.address1}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <span>Address 2:</span><br />
                <input
                  type="text"
                  name="address"
                  bind:value={formDataBind.address2}
                />
              </label>
            </div>
            <div>
              <label>
                <span>Zip:</span><br />
                <input
                  type="text"
                  name="zip"
                  bind:value={formDataBind.zip}
                  required
                />
            </label>
            </div>
          </div>
          <div class="table">
            <div>
              <label>
                <span>Province:</span><br>
                <input type="text" name="province" bind:value={formDataBind.province}>
              </label>
            </div>
            <div>
              <label>
                <span>Postal Code:</span><br>
                <input type="text" name="postal_code" bind:value={formDataBind.postal_code}>
              </label>
            </div>
          </div>
          <div class="table">
            <div>
              <label>
                <span>Primary Phone Number:</span><br />
                <input
                  type="text"
                  name="phone"
                  bind:value={formDataBind.phone}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <span>Email:</span><br />
                <input
                  name="email"
                  type="email"
                  bind:value={formDataBind.email}
                  required
                />
              </label>
            </div>
          </div>
          
          <br />
          <br />
          <label
            ><span>Meeting Preference:</span>
            <select name="meet_preferences" bind:value={formDataBind.meet_pref}>
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
          <div class="scroll">
            <label for="synopsis">Synopsis:</label>
            <br />
            <textarea
              name="synopsis"
              id="synopsis"
              cols="50%"
              rows="10"
              placeholder="Write a brief synopsis of you play."
              bind:value={formDataBind.synopsis}
            />
            <br />
            <label for="play_future">Play Improvements:</label>
            <br />
            <textarea
              name="play_future"
              id="play_future"
              cols="50%"
              rows="10"
              placeholder="Where do you think you can improve this play and why?"
              bind:value={formDataBind.play_future}
            />
          </div>
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
  .filebox {
    border: black solid 2px;
    border-radius: 10px;
    width: 400px;
  }
  .numbers label {
    display: inline-block;
    width: 13%;
  }
  .table {
    display: inline-flex;
    margin-bottom: 10pt;
  }
  .table div {
    display: inline-flex;
    margin-right: 20pt;
  }
  .numbers input {
    display: inline-block;
    width: 10%;
    height: 16pt;
    margin-bottom: 10pt;
    border-radius: 5pt;
  }
  .scroll {
    height: 100%;
    overflow-y: scroll;
  }
  input {
    border-radius: 10pt;
    height: 18pt;
    padding-left: 10pt;
  }
  input:focus {
    background-color: rgb(223, 223, 223);
  }
  input[required]:invalid {
    border-color: red;
  }
  textarea {
    border-radius: 5pt;
    border: black solid 2pt;
  }
  .step {
    margin: 8vh 0px;
    height: 55vh;
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
