<script>
  // SMUI
  import Textfield from "@smui/textfield";
  import { Cell } from "@smui/layout-grid";
  import CharacterCounter from "@smui/textfield/character-counter";
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Select, { Option } from "@smui/select";
  import HelperText from "@smui/textfield/helper-text";
  // Components
  import ApplicationStep from "$lib/components/ApplicationStep.svelte";
  // Utils
  import "$lib/global.scss";
  import { activeTab } from "$lib/stores";
  import {
    applicationForm,
    applicationTabs,
    retreatFormatPreferenceOptions,
    toneOptions,
  } from "$lib/ui/common";
  import { statesCities, countries } from "$lib/utils/location-data";
  import { validateApplication } from "$lib/validations/index";
  import { createForm } from "svelte-forms-lib";
  import ErrorMessage from "$lib/components/ErrorMessage.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import Information from "$lib/components/Information.svelte";
  import { PDFDocument } from "pdf-lib";
  import { setContext } from "svelte";
  import { alert } from "$lib/components/Alert.svelte";
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: { ...applicationForm },
    validate: validateApplication,
    onSubmit: () => {
      console.log("Submitted");
      return;
    },
  });

  setContext("application", { form, errors, handleSubmit });

  let totalActors = 0;
  let maxActors = 4;

  function updateTotalAct() {
    totalActors =
      Number.parseInt($form.actors_men || 0) +
      Number.parseInt($form.actors_women || 0) +
      Number.parseInt($form.actors_neutral || 0);
    if (totalActors > 4) {
      alert.show(`Your minimum required amount of actors exceeds our limit of ${maxActors}`, "error");
    }
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const json = await formResponse.json();
    return json.req;
  }

  async function submit(e) {
    // console.log(e);
    $activeTab = "FINISHED";
    const [file] = $form.file;
    const path = file ? await fileUpload(file, $form) : null;
    $form.path = path;
    const alert = await formUpload($form);
    console.log(alert);
    console.log(alert.message);
  }

  let pageCount;
  let verifyPDF = false;
  async function getPageCount([file]) {
    if (!file) return;
    try {
      const arryBffr = await file.arrayBuffer();
      const doc = await PDFDocument.load(arryBffr);
      pageCount = doc.getPageCount();
      verifyPDF = true;
    } catch (error) {
      alert.show("Failed to read PDF", "error");
      pageCount = "Failed to read PDF";
      verifyPDF = false;
    }
  }
  function handleSelectChange(e) {
    const { value } = e.detail;
    const { id } = e.target;
    const event = { target: { id, value } }; // synthetic event to trigger form update
    handleChange(event);
  }
</script>

<svelte:head>
  <title>Apply</title>
</svelte:head>

<div class="apply">
  <div class="sideimage" style="flex-basis: {$activeTab === 'FINISHED' ? '100vw' : '40vw'}" s>
    <div class="sideimage-successtext" style="opacity: {$activeTab === 'FINISHED' ? '1' : '0'}">
      <h1>Thank you!</h1>
      <h2>You should recieive an email confirming your application</h2>
    </div>
  </div>
  <form on:submit|preventDefault={submit} style="display: {$activeTab === 'FINISHED' ? 'none' : 'block'}">
    <TabBar tabs={applicationTabs} let:tab bind:active={$activeTab}>
      <Tab on:click$preventDefault {tab}>
        <Label>{tab}</Label>
      </Tab>
    </TabBar>
    <!-- Play Info -->
    <ApplicationStep tab={0}>
      <Cell span={12}>Play</Cell>
      <Cell span={8}>
        <div class="hide-file-ui">
          <Textfield
            variant="outlined"
            label="File"
            type="file"
            input$name="file"
            on:change={(e) => {
              handleChange(e);
              getPageCount($form.file);
            }}
            bind:files={$form.file}
          />
          <ErrorMessage error={$errors?.file} />
        </div>
      </Cell>
      <Cell span={4}>Page Count: {pageCount || "-"}</Cell>
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
      <Cell span={4}>
        <Select
          id="tone"
          label="Tone of Play"
          variant="outlined"
          bind:value={$form.tone}
          on:MDCSelect:change={handleSelectChange}
        >
          {#each Object.entries(toneOptions) as [label, value]}
            <Option {value}>{label}</Option>
          {/each}
        </Select>
        <ErrorMessage error={$errors?.tone} />
      </Cell>
      <Cell span={12}>Information</Cell>
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
    <!-- Character Info -->
    <ApplicationStep tab={1}>
      <Cell span={12}>Characters</Cell>
      <Cell span={4}>
        <Textfield
          label="Men"
          input$name="character_men"
          variant="outlined"
          type="number"
          input$min={0}
          bind:value={$form.character_men}
          on:change={handleChange}
        />
        <ErrorMessage error={$errors?.character_men} />
      </Cell>
      <Cell span={4}>
        <Textfield
          label="Women"
          input$name="character_women"
          variant="outlined"
          type="number"
          input$min={0}
          bind:value={$form.character_women}
          on:change={handleChange}
        />
        <ErrorMessage error={$errors?.character_women} />
      </Cell>
      <Cell span={4}>
        <Textfield
          label="Neutral"
          variant="outlined"
          type="number"
          input$name="character_neutral"
          input$min={0}
          bind:value={$form.character_neutral}
          on:change={handleChange}
        />
        <ErrorMessage error={$errors?.character_neutral} />
      </Cell>
      <Cell span={12}>
        <Information>
          Please explain any difference between the number of characters listed in the script and the number
          of actors needed to perform it. Plans for double-casting should be described specifically--i.e, John
          Doe and Ronald Roe can be played by the same actor, or Actor Two plays Mrs. Simpson and Elizabeth
          Bowes-Lyon, or the actor who plays the Giraffe can double as the offstage voice.
        </Information>
        <Textfield
          input$name="character_explanation"
          label="Character Count Explanation"
          style="width: 100%; min-height: 150px;"
          textarea
          input$maxlength={600}
          placeholder="Please all character in this play."
          bind:value={$form.character_explanation}
          on:change={handleChange}
        >
          <CharacterCounter slot="internalCounter" />
        </Textfield>
        <ErrorMessage error={$errors?.character_explanation} />
      </Cell>
    </ApplicationStep>
    <!-- Actor Info -->
    <ApplicationStep tab={2}>
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
          input$min={0}
          input$max={maxActors}
          input$name="actors_men"
          bind:value={$form.actors_men}
          on:change={(e) => {
            handleChange(e);
            updateTotalAct();
            if (totalActors > maxActors) {
              $form.actors_men = "";
              updateTotalAct();
            }
          }}
        />
        <ErrorMessage error={$errors?.actors_men} />
      </Cell>
      <Cell span={4}>
        <Textfield
          label="Women"
          id="actor_count"
          input$min={0}
          input$max={maxActors}
          variant="outlined"
          type="number"
          input$name="actors_women"
          bind:value={$form.actors_women}
          on:change={(e) => {
            handleChange(e);
            updateTotalAct();
            if (totalActors > maxActors) {
              $form.actors_women = "";
              updateTotalAct();
            }
          }}
        />
        <ErrorMessage error={$errors?.actors_women} />
      </Cell>
      <Cell span={4}>
        <Textfield
          type="number"
          id="actor_count"
          input$min={0}
          input$max={maxActors}
          label="Neutral"
          variant="outlined"
          input$name="actors_neutral"
          bind:value={$form.actors_neutral}
          on:change={(e) => {
            handleChange(e);
            updateTotalAct();
            if (totalActors > maxActors) {
              $form.actors_neutral = "";
              updateTotalAct();
            }
          }}
        />
        <ErrorMessage error={$errors?.actors_neutral} />
      </Cell>
      <Cell span={12}>
        <Information>
          Please explain any difference between the number of characters listed in the script and the number
          of actors needed to perform it. Plans for double-casting should be described specifically--i.e, John
          Doe and Ronald Roe can be played by the same actor, or Actor Two plays Mrs. Simpson and Elizabeth
          Bowes-Lyon, or the actor who plays the Giraffe can double as the offstage voice.
        </Information>
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
        <ErrorMessage error={$errors?.actor_explain} />
      </Cell>
    </ApplicationStep>
    <!-- Personal Details -->
    <ApplicationStep tab={3}>
      <Cell span={12}>Name</Cell>
      <Cell span={4}>
        <Textfield
          label="First Name"
          variant="outlined"
          type="text"
          input$name="fname"
          on:change={handleChange}
          bind:value={$form.fname}
        />
        <ErrorMessage error={$errors?.fname} />
      </Cell>
      <Cell span={4}>
        <Textfield
          variant="outlined"
          label="Middle Name"
          type="text"
          input$name="mname"
          bind:value={$form.mname}
          on:change={handleChange}
        />
        <ErrorMessage error={$errors?.mname} />
      </Cell>
      <Cell span={4}>
        <Textfield
          label="Last Name"
          variant="outlined"
          type="text"
          input$name="lname"
          on:change={handleChange}
          bind:value={$form.lname}
        />
        <ErrorMessage error={$errors?.lname} />
      </Cell>
      <Cell span={12}>About You</Cell>
      <Cell span={12}>
        <Textfield
          textarea
          input$name="prof_intro"
          label="Professional Introduction"
          style="width: 100%; min-height: 150px;"
          placeholder="What is you professional background?"
          on:change={handleChange}
          bind:value={$form.prof_intro}
        >
          <HelperText slot="helper"
            >Please introduce yourself professionally -- i.e., productions, readings, awards, publications,
            education, etc.</HelperText
          >
        </Textfield>
        <ErrorMessage error={$errors?.prof_intro} />
      </Cell>
      <Cell span={12}>
        <Textfield
          label="Personal Introduction"
          textarea
          variant="outlined"
          input$name="person_intro"
          style="width: 100%; min-height: 150px;"
          placeholder="Tell us about yourself."
          on:change={handleChange}
          bind:value={$form.person_intro}
        >
          <HelperText slot="helper"
            >Tell us something about yourself in addition to your theatre work.
          </HelperText>
        </Textfield>
        <ErrorMessage error={$errors?.person_intro} />
      </Cell>
    </ApplicationStep>
    <!-- Contact Info -->
    <ApplicationStep tab={4}>
      <Cell span={12}>Address</Cell>
      <Cell span={4}>
        <Select label="Country" variant="outlined" on:change={handleChange} bind:value={$form.country}>
          {#each countries as country}
            <Option value={country}>{country}</Option>
          {/each}
        </Select>
        <ErrorMessage error={$errors?.country} />
      </Cell>
      <Cell span={8} />
      <Cell span={12}>
        <Textfield
          type="text"
          variant="outlined"
          label="Address (Line 1)"
          input$name="address1"
          on:change={handleChange}
          bind:value={$form.address1}
        />
        <ErrorMessage error={$errors?.address1} />
      </Cell>
      <Cell span={12}>
        <Textfield
          variant="outlined"
          label="Address (Line 2)"
          type="text"
          input$name="address2"
          on:change={handleChange}
          bind:value={$form.address2}
        />
        <ErrorMessage error={$errors?.address2} />
      </Cell>

      <Cell span={4}>
        <Textfield
          label="City"
          variant="outlined"
          input$name="city"
          on:change={handleChange}
          bind:value={$form.city}
        />
        <ErrorMessage error={$errors?.city} />
      </Cell>
      {#if $form.country === "United States"}
        <Cell span={4}>
          <Select
            id="state"
            on:MDCSelect:change={handleSelectChange}
            bind:value={$form.state}
            label="State"
            variant="outlined"
          >
            {#each Object.entries(statesCities) as [value, label]}
              <Option {value}>{label}</Option>
            {/each}
          </Select>
          <ErrorMessage error={$errors?.state} />
        </Cell>
      {/if}
      {#if $form.country === "United States" && !!$form.country}
        <Cell span={4}>
          <Textfield
            variant="outlined"
            label="Zip"
            type="text"
            input$name="zip"
            bind:value={$form.zip}
            on:change={handleChange}
          />
          <ErrorMessage error={$errors?.zip} />
        </Cell>
      {/if}

      {#if $form.country !== "United States" && !!$form.country}
        <Cell span={4}>
          <Textfield
            variant="outlined"
            label="Province"
            type="text"
            input$name="province"
            on:change={handleChange}
            bind:value={$form.province}
          />
          <ErrorMessage error={$errors?.province} />
        </Cell>
        <Cell span={4}>
          <Textfield
            variant="outlined"
            label="Postal Code"
            type="text"
            input$name="postal_code"
            on:change={handleChange}
            bind:value={$form.postal_code}
          />
          <ErrorMessage error={$errors?.postal_code} />
        </Cell>
      {/if}
      <Cell span={12}>Contact / Links</Cell>
      <Cell span={4}>
        <Textfield
          variant="outlined"
          label="Primary Phone Number"
          type="tel"
          input$name="phone"
          on:change={handleChange}
          bind:value={$form.phone}
        />
        <ErrorMessage error={$errors?.phone} />
      </Cell>
      <Cell span={4}>
        <Textfield
          variant="outlined"
          label="Email"
          input$name="email"
          type="email"
          on:change={handleChange}
          bind:value={$form.email}
        />
        <ErrorMessage error={$errors?.email} />
      </Cell>
      <Cell span={4}>
        <Select
          label="Retreat Format Preference"
          variant="outlined"
          id="meet_pref"
          bind:value={$form.meet_pref}
          on:MDCSelect:change={handleSelectChange}
        >
          {#each Object.entries(retreatFormatPreferenceOptions) as [label, value]}
            <Option {value}>{label}</Option>
          {/each}
        </Select>
        <ErrorMessage error={$errors?.meet_pref} />
      </Cell>
      <Cell span={4}>
        <Textfield
          variant="outlined"
          label="Work Website (Optional)"
          type="text"
          input$name="work_web"
          on:change={handleChange}
          bind:value={$form.work_web}
        />
        <ErrorMessage error={$errors?.work_web} />
      </Cell>
      <Cell span={4}>
        <Textfield
          label="Personal Website (Optional)"
          type="text"
          variant="outlined"
          input$name="person_web"
          on:change={handleChange}
          bind:value={$form.person_web}
        />
        <ErrorMessage error={$errors?.person_web} />
      </Cell>
      <Cell span={4}>
        <Textfield
          label="NPX Profile URL (Optional)"
          type="text"
          variant="outlined"
          input$name="npx_profile"
          on:change={handleChange}
          bind:value={$form.npx_profile}
        />
        <ErrorMessage error={$errors?.npx_profile} />
      </Cell>
    </ApplicationStep>
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
    height: 100%;
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
    padding: 0vh 0px 0vh;
    flex-basis: 60vw;
    margin: 0px 5vw;
    height: 100%;
  }
</style>
