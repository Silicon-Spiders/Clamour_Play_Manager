<script>
  // SMUI
  import Textfield from "@smui/textfield";
  import { Cell } from "@smui/layout-grid";
  import CharacterCounter from "@smui/textfield/character-counter";
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Select, { Option } from "@smui/select";
  import Autocomplete from "@smui-extra/autocomplete";
  import HelperText from "@smui/textfield/helper-text";
  // Components
  import ApplicationStep from "$lib/components/ApplicationStep.svelte";
  // Utils
  import "$lib/global.scss";
  import { activeTab } from "$lib/stores";
  import { applicationForm, applicationTabs } from "$lib/ui/common";
  import { statesCities, countries } from "$lib/utils/location-data";
  import { validateApplication } from "$lib/validations/application";
  import { createForm } from "svelte-forms-lib";
  import ErrorMessage from "$lib/components/ErrorMessage.svelte";

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: { ...applicationForm },
    validate: validateApplication,
    onSubmit: () => {
      console.log("Submitted");
      return;
    },
  });

  let formFile = [];

  let totalActors = 0;

  function updateTotalAct() {
    totalActors = $form.actors_men + $form.actors_women + $form.actors_neutral;
  }

  async function fileUpload(file, form) {
    let fileUpload = new FormData();
    fileUpload.append("file", file);
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
      body: JSON.stringify(form)
    });

    const json = await formResponse.json();

    return json.req;
  }

  async function submit(e) {
    // console.log(e);
    $activeTab = "FINISHED";
    const [file] = formFile;
    const path = file ? await fileUpload(file, $form) : null;
    $form.path = path;
    const alert = await formUpload($form);
    console.log(alert);
    console.log(alert.message);
  }
  // $: console.log({ $errors });
</script>

<svelte:head>
  <title>Apply</title>
  <!-- Main Script Submission Page -->
</svelte:head>

<div class="apply">
  <div class="sideimage" style="flex-basis: {$activeTab === 'FINISHED' ? '100vw' : '40vw'}">
    <div class="sideimage-successtext" style="opacity: {$activeTab === 'FINISHED' ? '1' : '0'}">
      <h1>Thank you!</h1>
      <h2>You should recieive an email confirming your application</h2>
    </div>
  </div>
  <form
    on:submit|preventDefault={handleSubmit}
    style="display: {$activeTab === 'FINISHED' ? 'none' : 'block'}"
  >
    <TabBar tabs={applicationTabs} let:tab bind:active={$activeTab}>
      <Tab on:click$preventDefault {tab}>
        <Label>{tab}</Label>
      </Tab>
    </TabBar>
    <!-- Tabular Navigation -->
    <ApplicationStep tab={0}>
      <Cell span={4}>
        <div class="hide-file-ui">
          <Textfield
            variant="outlined"
            label="File"
            type="file"
            input$name="file"
            on:change={handleChange}
            bind:files={formFile}
          />
          <ErrorMessage error={$errors?.file} />
        </div>
      </Cell>
      <Cell span={8}>
        <Textfield
          variant="outlined"
          label="Title"
          type="text"
          input$name="title"
          on:change={handleChange}
          bind:value={$form.title}
        />
        <ErrorMessage error={$errors?.title} />
      </Cell>
      <Cell span={12}>
        <Textfield
          label="Synopsis"
          variant="outlined"
          textarea
          style="width: 100%; min-height: 150px;"
          placeholder="Write a brief synopsis of you play."
          input$name="synopsis"
          on:change={handleChange}
          bind:value={$form.synopsis}
        >
          <HelperText slot="helper">Write a brief synopsis of your play.</HelperText>
        </Textfield>
        <ErrorMessage error={$errors?.synopsis} />
      </Cell>
      <Cell span={12}>
        <Textfield
          textarea
          variant="outlined"
          label="Next Steps in Development"
          id="play_future"
          style="width: 100%; min-height: 150px;"
          input$name="play_future"
          on:change={handleChange}
          bind:value={$form.play_future}
        >
          <HelperText slot="helper">
            Please enter what you think are your next steps in development of this play.
          </HelperText>
        </Textfield>
        <ErrorMessage error={$errors?.play_future} />
      </Cell>
    </ApplicationStep>
    <ApplicationStep tab={1}>
      <Cell span={12}>
        <h3>Actors (Total: {totalActors})</h3>
        <span class="tooltip">Enter how many actors will be required to complete this play.</span>
      </Cell>
      <Cell span={4}>
        <Textfield
          id="actor_count"
          variant="outlined"
          type="number"
          label="Men"
          min="0"
          input$name="actors_men"
          bind:value={$form.actors_men}
          on:change={(e) => {
            handleChange(e);
            updateTotalAct();
          }}
        />
        <ErrorMessage error={$errors?.actors_men} />
      </Cell>
      <Cell span={4}>
        <Textfield
          label="Women"
          id="actor_count"
          min="0"
          variant="outlined"
          type="number"
          input$name="actors_women"
          bind:value={$form.actors_women}
          on:change={(e) => {
            handleChange(e);
            updateTotalAct();
          }}
        />
      </Cell>
      <Cell span={4}>
        <Textfield
          type="number"
          id="actor_count"
          min="0"
          label="Neutral"
          variant="outlined"
          input$name="actors_neutral"
          bind:value={$form.actors_neutral}
          on:change={(e) => {
            handleChange(e);
            updateTotalAct();
          }}
        />
      </Cell>
      <Cell span={12}>
        <p>
          Please explain any difference between the number of characters listed in the script and the number
          of actors needed to perform it. Plans for double-casting should be described specifically--i.e, John
          Doe and Ronald Roe can be played by the same actor, or Actor Two plays Mrs. Simpson and Elizabeth
          Bowes-Lyon, or the actor who plays the Giraffe can double as the offstage voice.
        </p>
        <Textfield
          id="actor_explain"
          input$name="actor_explain"
          label="Actor Count Explanation"
          style="width: 100%; min-height: 150px;"
          textarea
          input$maxlength={180}
          placeholder="Please explain why this many actors can perform this play."
          bind:value={$form.actor_explain}
          on:change={handleChange}
        >
          <CharacterCounter slot="internalCounter" />
        </Textfield>
      </Cell>
    </ApplicationStep>
    <ApplicationStep tab={2}>
      <Cell span={12}>
        <Textfield
          variant="outlined"
          label="Work Website"
          type="text"
          name="work_web"
          on:change={handleChange}
          bind:value={$form.work_web}
        />
      </Cell>
      <Cell span={12}>
        <Textfield
          label="Personal Website"
          type="text"
          variant="outlined"
          name="person_web"
          on:change={handleChange}
          bind:value={$form.person_web}
        />
      </Cell>
      <Cell span={12}>
        <Textfield
          label="NPX Profile URL (Optional)"
          type="text"
          variant="outlined"
          name="npx_profile"
          on:change={handleChange}
          bind:value={$form.npx_profile}
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
          on:change={handleChange}
          bind:value={$form.prof_intro}
        >
          <HelperText slot="helper"
            >Please introduce yourself professionally -- i.e., productions, readings, awards, publications,
            education, etc.</HelperText
          >
        </Textfield>
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
          on:change={handleChange}
          bind:value={$form.person_intro}
        >
          <HelperText slot="helper"
            >Tell us something about yourself in addition to your theatre work.
          </HelperText>
        </Textfield>
      </Cell>
    </ApplicationStep>
    <ApplicationStep tab={3}>
      <Cell span={4}>
        <Textfield
          label="First Name"
          variant="outlined"
          type="text"
          name="fname"
          on:change={handleChange}
          bind:value={$form.fname}
          required
        />
      </Cell>
      <Cell span={4}>
        <Textfield variant="outlined" label="Middle Name" type="text" name="mname" bind:value={$form.mname} />
      </Cell>
      <Cell span={4}>
        <Textfield
          label="Last Name"
          variant="outlined"
          type="text"
          name="lname"
          on:change={handleChange}
          bind:value={$form.lname}
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
          on:change={handleChange}
          bind:value={$form.country}
        />
      </Cell>
      {#if $form.country === "United States"}
        <!-- content here -->
        <Cell span={4}>
          <Autocomplete
            options={Object.keys(statesCities)}
            on:change={handleChange}
            bind:value={$form.state}
            label="State"
            textfield$variant="outlined"
            name="state"
            required
          />
        </Cell>
      {/if}
      {#if $form.country === "United States"}
        <Cell span={4}>
          <Autocomplete
            combobox
            options={statesCities[$form.state]}
            label="City"
            textfield$variant="outlined"
            name="city"
            bind:value={$form.city}
            on:change={handleChange}
            required
          />
        </Cell>
      {:else}
        <Cell span={4}>
          <Textfield
            label="City"
            variant="outlined"
            name="city"
            on:change={handleChange}
            bind:value={$form.city}
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
          on:change={handleChange}
          bind:value={$form.address1}
          required
        />
      </Cell>
      <Cell span={12}>
        <Textfield
          variant="outlined"
          label="Address (Line 2)"
          type="text"
          name="address"
          on:change={handleChange}
          bind:value={$form.address2}
        />
      </Cell>
      <Cell span={4}>
        <Textfield variant="outlined" label="Zip" type="text" name="zip" bind:value={$form.zip} required />
      </Cell>
      {#if $form.country !== "United States" && !!$form.country}
        <Cell span={4}>
          <Textfield
            variant="outlined"
            label="Province"
            type="text"
            name="province"
            on:change={handleChange}
            bind:value={$form.province}
          />
        </Cell>
        <Cell span={4}>
          <Textfield
            variant="outlined"
            label="Postal Code"
            type="text"
            name="postal_code"
            on:change={handleChange}
            bind:value={$form.postal_code}
          />
        </Cell>
      {/if}
      <Cell span={4}>
        <Textfield
          variant="outlined"
          label="Primary Phone Number"
          type="text"
          name="phone"
          on:change={handleChange}
          bind:value={$form.phone}
          required
        />
      </Cell>
      <Cell span={4}>
        <Textfield
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          on:change={handleChange}
          bind:value={$form.email}
          required
        />
      </Cell>
      <Cell span={4}>
        <Select
          label="Meeting Preference"
          variant="outlined"
          name="meet_preferences"
          bind:value={$form.meet_pref}
        >
          <Option value="physical">In person</Option>
          <Option value="online">Online</Option>
        </Select>
      </Cell>
    </ApplicationStep>
  </form>
</div>

<style lang="scss">
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
</style>
