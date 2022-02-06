<script>
  import Textfield from "@smui/textfield";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import CharacterCounter from "@smui/textfield/character-counter";
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Button from "@smui/button";
  import "$lib/global.scss";
  import Select, { Option } from "@smui/select";
  import { statesCities, countries } from "$lib/utils/location-data";
  import Autocomplete from "@smui-extra/autocomplete";

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
    totalActors = formDataBind.actors_men + formDataBind.actors_women + formDataBind.actors_neutral;
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
    const formResponse = await fetch("server/submission/form.json", {
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
  let drag = false;
  $: console.log(formFile);
  let active = "Play Info";
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
  <form on:submit|preventDefault={submit} style="display: {finish ? 'none' : 'block'}">
    <TabBar tabs={["Play Info", "Personal Details", "Contact Info", "Finish & Submit"]} let:tab bind:active>
      <Tab {tab}>
        <Label>{tab}</Label>
      </Tab>
    </TabBar>

    {#if active === "Play Info"}
      <div class="step">
        <div class="scroll">
          <LayoutGrid>
            <Cell span={4}>
              <label
                class="material-icons-outlined file-drop {drag || !!formFile
                  ? 'file-drop-border-drag'
                  : 'file-drop-border-default'}"
                style=""
                on:dragover|preventDefault={(e) => (drag = true)}
                on:drop|preventDefault={(e) => {
                  formFile = e.dataTransfer.files;
                }}
                on:dragleave|preventDefault={() => (drag = false)}
                for="play_pdf"
                >cloud_upload
              </label>
              <input class="filebox" id="play_pdf" type="file" bind:files={formFile} required />
            </Cell>
            <Cell span={8}>
              <LayoutGrid>
                <Cell span={12}>
                  <Cell span={12}>
                    {#if !!formFile}
                      <span class="file">
                        File: {formFile[0].name}
                      </span>
                    {/if}
                  </Cell>
                  <Textfield
                    variant="outlined"
                    label="Title"
                    type="text"
                    bind:value={formDataBind.title}
                    required
                  />
                </Cell>
              </LayoutGrid>
            </Cell>

            <Cell span={12}>
              <h3>Actors (Total: {totalActors})</h3>
              <span class="tooltip">Enter how many actors will be required to complete this play.</span>
            </Cell>
            <Cell span={4}>
              <Textfield
                id="actor_count"
                name="actor_count"
                variant="outlined"
                type="number"
                label="Men"
                min="0"
                bind:value={formDataBind.actors_men}
                on:change={updateTotalAct}
              />
            </Cell>
            <Cell span={4}>
              <Textfield
                label="Women"
                type="number"
                id="actor_count"
                min="0"
                variant="outlined"
                name="actor_count"
                bind:value={formDataBind.actors_women}
                on:change={updateTotalAct}
              />
            </Cell>
            <Cell span={4}>
              <Textfield
                type="number"
                id="actor_count"
                min="0"
                label="Neutral"
                variant="outlined"
                name="actor_count"
                bind:value={formDataBind.actors_neutral}
                on:change={updateTotalAct}
              />
            </Cell>
            <Cell span={12}>
              <Textfield
                id="actor_explain"
                name="actor_explain"
                label="Actor Count Explanation"
                style="width: 100%; height: 100px;"
                textarea
                input$maxlength={180}
                placeholder="Please explain why this many actors can perform this play."
                bind:value={formDataBind.actor_explain}
              >
                <CharacterCounter slot="internalCounter" />
              </Textfield>
            </Cell>
          </LayoutGrid>
        </div>
      </div>

      <div class="step-btns">
        <div />
        <Button variant="outlined" on:click={() => (active = "Personal Details")}>Next</Button>
      </div>
    {:else if active === "Personal Details"}
      <div class="step">
        <LayoutGrid>
          <Cell span={12}>
            <Textfield
              variant="outlined"
              label="Work Website"
              type="text"
              name="work_web"
              bind:value={formDataBind.work_web}
            />
          </Cell>
          <Cell span={12}>
            <Textfield
              label="Personal Website"
              type="text"
              variant="outlined"
              name="person_web"
              bind:value={formDataBind.person_web}
            />
          </Cell>
          <Cell span={12}>
            <Textfield
              textarea
              name="prof_intro"
              label="Professional Introduction"
              id="prof_intro"
              style="width:100%"
              placeholder="What is you professional background?"
              bind:value={formDataBind.prof_intro}
            />
          </Cell>
          <Cell span={12}>
            <Textfield
              label="Personal Introduction"
              textarea
              variant="outlined"
              name="person_intro"
              id="person_intro"
              style="width:100%"
              placeholder="Tell us about yourself."
              bind:value={formDataBind.person_intro}
            />
          </Cell>
        </LayoutGrid>
      </div>
      <div class="step-btns">
        <Button variant="outlined" on:click={() => (active = "Play Info")}>Previous</Button>
        <Button variant="outlined" on:click={() => (active = "Contact Info")}>Next</Button>
      </div>
    {:else if active === "Contact Info"}
      <div class="step">
        <LayoutGrid>
          <Cell span={4}>
            <Textfield
              label="First Name"
              variant="outlined"
              type="text"
              name="fname"
              bind:value={formDataBind.fname}
              required
            />
          </Cell>
          <Cell span={4}>
            <Textfield
              variant="outlined"
              label="Middle Name"
              type="text"
              name="mname"
              bind:value={formDataBind.mname}
            />
          </Cell>
          <Cell span={4}>
            <Textfield
              label="Last Name"
              variant="outlined"
              type="text"
              name="lname"
              bind:value={formDataBind.lname}
              required
            />
          </Cell>
          <Cell span={4}>
            <Autocomplete
              combobox
              label="Country"
              options={countries}
              textfield$variant="outlined"
              name="country"
              bind:value={formDataBind.country}
            />
          </Cell>
          {#if formDataBind.country === "United States"}
            <!-- content here -->
            <Cell span={4}>
              <Autocomplete
                combobox
                options={Object.keys(statesCities)}
                bind:value={formDataBind.state}
                label="State"
                textfield$variant="outlined"
                name="state"
                required
              />
            </Cell>
          {/if}
          {#if formDataBind.country === "United States"}
            <Cell span={4}>
              <Autocomplete
                combobox
                options={statesCities[formDataBind.state]}
                label="City"
                textfield$variant="outlined"
                name="city"
                bind:value={formDataBind.city}
                required
              />
            </Cell>
          {:else}
            <Cell span={4}>
              <Textfield
                label="City"
                variant="outlined"
                name="city"
                bind:value={formDataBind.city}
                required
              />
            </Cell>
          {/if}
          <Cell span={12}>
            <Textfield
              type="text"
              variant="outlined"
              label="Address (Line 1)"
              name="address"
              bind:value={formDataBind.address1}
              required
            />
          </Cell>
          <Cell span={12}>
            <Textfield
              variant="outlined"
              label="Address (Line 2)"
              type="text"
              name="address"
              bind:value={formDataBind.address2}
            />
          </Cell>
          <Cell span={4}>
            <Textfield
              variant="outlined"
              label="Zip"
              type="text"
              name="zip"
              bind:value={formDataBind.zip}
              required
            />
          </Cell>
          <Cell span={4}>
            <Textfield
              variant="outlined"
              label="Province"
              type="text"
              name="province"
              bind:value={formDataBind.province}
            />
          </Cell>
          <Cell span={4}>
            <Textfield
              variant="outlined"
              label="Postal Code"
              type="text"
              name="postal_code"
              bind:value={formDataBind.postal_code}
            />
          </Cell>
          <Cell span={4}>
            <Textfield
              variant="outlined"
              label="Primary Phone Number"
              type="text"
              name="phone"
              bind:value={formDataBind.phone}
              required
            />
          </Cell>
          <Cell span={4}>
            <Textfield
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              bind:value={formDataBind.email}
              required
            />
          </Cell>
          <Cell span={4}>
            <Select
              label="Meeting Preference"
              variant="outlined"
              name="meet_preferences"
              bind:value={formDataBind.meet_pref}
            >
              <Option value="physical">In person</Option>
              <Option value="online">Online</Option>
            </Select>
          </Cell>
        </LayoutGrid>
      </div>
      <div class="step-btns">
        <Button variant="outlined" on:click={() => (active = "Personal Details")}>Previous</Button>
        <Button variant="outlined" on:click={() => (active = "Finish & Submit")}>Next</Button>
      </div>
    {:else if active === "Finish & Submit"}
      <div class="step">
        <LayoutGrid>
          <Cell span={12}>
            <Textfield
              label="Synopsis"
              variant="outlined"
              textarea
              name="synopsis"
              id="synopsis"
              placeholder="Write a brief synopsis of you play."
              bind:value={formDataBind.synopsis}
            />
          </Cell>
          <Cell span={12}>
            <Textfield
              textarea
              variant="outlined"
              label="Play Improvements"
              name="play_future"
              id="play_future"
              cols="50%"
              rows="10"
              placeholder="Where do you think you can improve this play and why?"
              bind:value={formDataBind.play_future}
            />
          </Cell>
        </LayoutGrid>
      </div>

      <div class="step-btns">
        <button on:click={() => (active = "Contact Info")}>Previous</button>
        <button on:click={() => (finish = true)} type="submit">Submit</button>
      </div>
    {/if}
  </form>
</div>

<style lang="scss">
  @import "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp";
  input[type="file"] {
    display: none;
  }
  .drag {
    border: solid 4px gray;
  }
  .file {
    color: gray;
  }
  .file-drop {
    display: block;
    height: 100px;
    border-radius: 15px;
    color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
    &-border {
      &-default {
        border: dashed 4px gray;
      }
      &-drag {
        border: solid 4px gray;
      }
    }
  }
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
    padding: 5vh 0px 0vh;
    flex-basis: 60vw;
    margin: 0px 5vw;
  }
  .filebox {
    border: black solid 2px;
    border-radius: 10px;
    width: 400px;
  }
  .table {
    display: inline-flex;
    margin-bottom: 10pt;
  }
  .table div {
    display: inline-flex;
    margin-right: 20pt;
  }

  .scroll {
    overflow: auto;
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
    height: 60vh;
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
