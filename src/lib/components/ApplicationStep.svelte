<script>
  import { activeTab } from "$lib/stores";
  import { applicationTabs } from "$lib/ui/common";
  import { validateActorInfo } from "$lib/validations/actorInfo";
  import { validateCharacterInfo } from "$lib/validations/characterInfo";
  import { validateContactInfo } from "$lib/validations/contactInfo";
  import { validatePersonalDetails } from "$lib/validations/personalDetails";
  import { validatePlayInfo } from "$lib/validations/playInfo";
  import Button from "@smui/button";
  import LayoutGrid from "@smui/layout-grid";
  import { getContext } from "svelte";
  import { alert } from "./Alert.svelte";
  export let tab;

  let { form, errors } = getContext("application");
  // $: console.log({ $form });
  const tabtoValidationFn = {
    0: validatePlayInfo,
    1: validateCharacterInfo,
    2: validateActorInfo,
    3: validatePersonalDetails,
    4: validateContactInfo,
  };
</script>

{#if applicationTabs[tab] === $activeTab}
  <div class="container">
    <LayoutGrid>
      <slot />
    </LayoutGrid>
  </div>
  <div class="buttons">
    {#if tab - 1 !== -1}
      <Button
        variant="outlined"
        on:click$preventDefault={() => {
          const stepErrors = tabtoValidationFn[tab]($form);
          $errors = { ...$errors, ...stepErrors };
          // console.log({ stepErrors });
          if (Object.entries(stepErrors).length > 0) {
            alert.show("Please review any errors on this page", "error");
          } else {
            $activeTab = applicationTabs[tab - 1];
          }
        }}
      >
        Previous
      </Button>
    {:else}
      <div />
    {/if}

    {#if tab === applicationTabs.length - 1}
      <Button variant="outlined" type="submit">Finish and Submit</Button>
    {:else}
      <Button
        variant="outlined"
        on:click$preventDefault={() => {
          const stepErrors = tabtoValidationFn[tab]($form);
          $errors = { ...$errors, ...stepErrors };
          console.log({ stepErrors });
          if (Object.entries(stepErrors).length > 0) {
            alert.show("Please review any errors on this page", "error");
          } else {
            $activeTab = applicationTabs[tab + 1];
          }
        }}
      >
        Next
      </Button>
    {/if}
  </div>
{/if}

<style>
  .container {
    height: 85%;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>
