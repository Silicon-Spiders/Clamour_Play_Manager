<script>
  import Textfield from "@smui/textfield";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import CharacterCounter from "@smui/textfield/character-counter";
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import "$lib/global.scss";
  import Select, { Option } from "@smui/select";
  import { statesCities, countries } from "$lib/utils/location-data";
  import Autocomplete from "@smui-extra/autocomplete";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button from "@smui/button";
  import HelperText from "@smui/textfield/helper-text";
  import ApplicationStep from "$lib/components/ApplicationStep.svelte";

  let open;
  let formFile = [];
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
    npx_profile: "",
  };
  let totalActors = 0;

  function updateTotalAct() {
    totalActors = formDataBind.actors_men + formDataBind.actors_women + formDataBind.actors_neutral;
  }

  async function fileUpload(file, form) {
    let fileUpload = new FormData();
    fileUpload.append("file",file)
    const fileResponse = await fetch("server/submission/file.json", {
      method: "POST",
      body: fileUpload,
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
  $: {
    console.log(!!formFile);
    console.log({ drag });
  }
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
    <!-- Tabular Navigation -->
    <TabBar tabs={["Play Info", "Actor Info", "Personal Details", "Contact Info"]} let:tab bind:active>
      <Tab {tab}>
        <Label>{tab}</Label>
      </Tab>
    </TabBar>

    {#if active === "Play Info"}
      <ApplicationStep>
        <Cell span={4}>
          <div class="hide-file-ui">
            <Textfield label="File" type="file" bind:files={formFile} />
          </div>
        </Cell>
        <Cell span={8}>
          <Textfield variant="outlined" label="Title" type="text" bind:value={formDataBind.title} />
        </Cell>
        <Cell span={12}>
          <Textfield
            label="Synopsis"
            variant="outlined"
            textarea
            name="synopsis"
            style="width: 100%; min-height: 150px;"
            id="synopsis"
            placeholder="Write a brief synopsis of you play."
            bind:value={formDataBind.synopsis}
          >
            <HelperText slot="helper">Write a brief synopsis of your play.</HelperText>
          </Textfield>
        </Cell>
        <Cell span={12}>
          <Textfield
            textarea
            variant="outlined"
            label="Next Steps in Development"
            name="play_future"
            id="play_future"
            style="width: 100%; min-height: 150px;"
            bind:value={formDataBind.play_future}
          >
            <HelperText slot="helper">Where do you think you can improve this play and why?</HelperText>
          </Textfield>
        </Cell>
        <Button
          slot="next"
          variant="outlined"
          on:click$preventDefault={() => {
            active = "Actor Info";
          }}
        >
          Next
        </Button>
      </ApplicationStep>
    {:else if active === "Actor Info"}
      <ApplicationStep>
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
            style="width: 100%; min-height: 150px;"
            textarea
            input$maxlength={180}
            placeholder="Please explain why this many actors can perform this play."
            bind:value={formDataBind.actor_explain}
          >
            <CharacterCounter slot="internalCounter" />
          </Textfield>
        </Cell>
        <Button
          slot="previous"
          variant="outlined"
          on:click$preventDefault={() => {
            active = "Play Info";
          }}>Previous</Button
        >
        <Button
          slot="next"
          variant="outlined"
          on:click$preventDefault={() => {
            active = "Personal Details";
          }}>Next</Button
        >
      </ApplicationStep>
    {:else if active === "Personal Details"}
      <ApplicationStep>
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
            label="NPX Profile URL (Optional)"
            type="text"
            variant="outlined"
            name="npx_profile"
            bind:value={formDataBind.npx_profile}
          />
        </Cell>
        <Cell span={12}>
          <Textfield
            textarea
            name="prof_intro"
            label="Professional Introduction"
            style="width: 100%; min-height: 150px;"
            id="prof_intro"
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
            style="width: 100%; min-height: 150px;"
            placeholder="Tell us about yourself."
            bind:value={formDataBind.person_intro}
          />
        </Cell>
        <Button
          slot="previous"
          variant="outlined"
          on:click$preventDefault={() => {
            active = "Actor Info";
          }}>Previous</Button
        >
        <Button
          slot="next"
          variant="outlined"
          on:click$preventDefault={() => {
            active = "Contact Info";
          }}>Next</Button
        >
      </ApplicationStep>
    {:else if active === "Contact Info"}
      <ApplicationStep>
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
            <Textfield label="City" variant="outlined" name="city" bind:value={formDataBind.city} required />
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
        <Button
          slot="previous"
          variant="outlined"
          on:click$preventDefault={() => (active = "Personal Details")}>Previous</Button
        >
        <Button slot="next" variant="outlined" on:click$preventDefault={() => (finish = true)} type="submit"
          >Finish and Submit</Button
        >
      </ApplicationStep>
    {/if}
  </form>
</div>

<style lang="scss">
  @import "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp";

  .hide-file-ui :global(input[type="file"]::file-selector-button) {
    display: none;
  }

  .hide-file-ui :global(:not(.mdc-text-field--label-floating) input[type="file"]) {
    color: transparent;
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

  .step {
    margin: 5vh 0px;
    height: 60vh;
    &-btns {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
