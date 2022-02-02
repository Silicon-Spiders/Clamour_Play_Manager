<script>
  import { sideProfile } from "$lib/stores";
  import Icon from "./Icon.svelte";

  $: console.log($sideProfile);
  let edit = false;
  let editEvaluatorForm = {};

  const submitUpdate = async (e) => {
    const res = await fetch(e.target.action, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editEvaluatorForm),
    });
    // response = res.json();
    // console.log(response);
    // edit = false;
    // return;
  };
</script>

<div style="flex-grow: {$sideProfile ? '1' : '0'};transition: all 0.25s ease;max-width: 30%;">
  {#if $sideProfile}
    <div class="side-profile">
      <div
        class="close"
        on:click={() => {
          $sideProfile = null;
          edit = false;
        }}
      >
        <Icon code="highlight_off" />
      </div>
      <div class="evaluator-name">
        <span>{$sideProfile.firstName} {$sideProfile.lastName}</span>
        <Icon code="account_circle" --icon-size="2em" />
      </div>
      <hr />
      <div class="actions">
        <a href="mailto:{$sideProfile.email}"><Icon code="email" --icon-size="1.5em" /></a>

        <a href="tel:+{$sideProfile.phone}"><Icon code="call" --icon-size="1.5em" /></a>

        <span
          style="cursor:pointer"
          on:click={() => {
            edit = true;
            if ($sideProfile && edit === true) {
              editEvaluatorForm = {
                id: $sideProfile._id,
                firstName: $sideProfile.firstName,
                lastName: $sideProfile.lastName,
                phone: $sideProfile.phone,
                email: $sideProfile.email,
                username: $sideProfile.username,
                password: $sideProfile.password,
              };
              console.log(editEvaluatorForm);
            }
          }}
        >
          <Icon code="edit" --icon-size="1.5em" />
        </span>
      </div>
      {#if edit}
        <div class="edit">
          <form on:submit|preventDefault={submitUpdate} action="../../server/admin/manage.json">
            <div class="field">
              <label for="firstName">First Name:</label>
              <input id="firstName" name="firstName" type="text" bind:value={editEvaluatorForm.firstName} />
            </div>
            <div class="field">
              <label for="lastName">Last Name:</label>
              <input id="lastName" name="lastName" type="text" bind:value={editEvaluatorForm.lastName} />
            </div>
            <br />
            <div class="field">
              <label for="email">Email: </label>
              <input id="email" name="email" type="text" bind:value={editEvaluatorForm.email} />
            </div>
            <div class="field">
              <label for="phone">Phone: </label>
              <input id="phone" name="phone" type="text" bind:value={editEvaluatorForm.phone} />
            </div>
            <br />
            <div class="field">
              <label for="username">Username: </label>
              <input id="username" name="username" type="text" bind:value={editEvaluatorForm.username} />
            </div>
            <div class="field">
              <label for="password">Password: </label>
              <input id="password" name="password" type="text" bind:value={editEvaluatorForm.password} />
            </div>
            <br />

            <button type="submit">Submit</button>
          </form>
        </div>
      {/if}
      <div />
    </div>
  {/if}
</div>

<style lang="scss">
  .edit {
    display: flex;
    flex-wrap: wrap;
    .field {
      display: inline-block;
    }
    label {
      display: block;
    }
  }

  .side-profile {
    transition: all 0.25s ease;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(128, 128, 128, 0.4);
    max-height: 70vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .close {
    align-self: flex-start;
    background-color: rgba(128, 128, 128, 0.2);
    padding: 5px;
    border-radius: 5px;
    transition: all 0.5s ease;
    font-size: 2em;
    &:hover {
      cursor: pointer;
      background-color: rgba(128, 128, 128, 0.5);
    }
  }
  .evaluator-name {
    display: flex;
    align-items: center;
    font-size: 1.5em;
  }
  hr {
    width: 100%;
    border: solid thin black;
  }
  .actions {
    display: flex;
    width: 100%;
    align-items: center;
    // column-gap: 20%;
    justify-content: space-evenly;
  }
</style>
