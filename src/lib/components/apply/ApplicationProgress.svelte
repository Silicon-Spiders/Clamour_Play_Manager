<script>
  import { getContext } from "svelte";

  const getStepWizardContext = () => {
    const context = getContext("StepWizard");
    if (!context) {
      throw new Error(
        "StepWizard compound components cannot be rendered outside the StepWizard component"
      );
    }
    return context;
  };

  const { step } = getStepWizardContext();
  // $: console.log($step);

  export let type = "apply";
</script>

{#if type == "apply"}

  <div class="progress">
    <div class="progress-titles">
      <span
        >Play Info
        <div class="progress-bar" style="width:{$step >= 1 ? '100' : '0'}%" />
      </span>
      <span
        >Personal Details
        <div class="progress-bar" style="width:{$step >= 2 ? '100' : '0'}%" />
      </span>
      <span
        >Contact Info
        <div class="progress-bar" style="width:{$step >= 3 ? '100' : '0'}%" />
      </span>
      <span
        >Finish & Submit
        <div class="progress-bar" style="width:{$step >= 4 ? '100' : '0'}%" />
      </span>
    </div>
  </div>

 {:else}

  <div class="progress">
     <div class="progress-extra-titles">
      <span
        >Play Info
        <div class="progress-bar" style="width:{$step >= 1 ? '100' : '0'}%" />
      </span>
      <span
        >Finish & Submit
        <div class="progress-bar" style="width:{$step >= 2 ? '100' : '0'}%" />
      </span>
    </div>
  </div>

{/if}


<style lang="scss">
  .progress {
    &-titles {
      display: flex;
      font-size: 14pt;
      column-gap: 1vw;
      span {
        text-align: center;
        flex-basis: 25%;
      }
    }
    &-bar {
      background-color: red;
      height: 25%;
      transition: all 1s ease;
    }
  }

  #center-form {

    margin: 0 auto;
  }

  .progress-extra {
    &-titles {
      display: flex;
      font-size: 14pt;
      column-gap: 1vw;
      span {
        text-align: center;
        flex-basis: 50%;
      }
    }
  }
  
</style>