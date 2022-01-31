<script>
    //EDITED THE FORM STYLE TOWARDS THE VERY BEGINNING. KEEP AN EYE ON THAT
    import { bind } from "svelte/internal";
    import StepWizard from "svelte-step-wizard";
    import { page } from '$app/stores'
  
    // import OutsideLayout from "../lib/components/layouts/Outside-layout.svelte";
    import ApplicationProgress from "$lib/components/apply/ApplicationProgress.svelte";

    const playID = $page.query.get('playid')
    console.log('Play ID in Evalution Page: ', playID);
  
    let formsData = {
      playID,
      numOfPages: 0,
      numOfFemales: 0,
      numOfMales: 0,
      numOfNonSpecific: 0,
      toneOfPlay: "",
      synopsis: "",
      evaluatorComments: "",
      rating: 0,
    };
    let totalActors = 0;
  
    function updateTotalAct() {
      totalActors =
        formsData.numOfMales +
        formsData.numOfFemales +
        formsData.numOfNonSpecific;
    }
    
  
    async function submit(e) {
     
        const insertEvaluation = await fetch("../../server/evaluator/evaluations.json", {

            method:'POST',
            mode:'cors',
            credentials:'same-origin',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formsData)
        });
         window.open('./evaluatorPage');
         return;
    }
    let finish = false;
  </script>
  
  <svelte:head>
    <title>Evaluation</title>
    <!-- Main Script Submission Page -->
  </svelte:head>
  
  <div class="evaluation">
    
    <form
      on:submit|preventDefault={submit}
      style="display: {finish ? '' : 'block'}"
    >
      <StepWizard initialStep={1}>
        <ApplicationProgress type = "evaluator"/>
        <StepWizard.Step num={1} let:nextStep>
          <div class="step">
            <h2>Play Info</h2>
            <div class="scroll">
              
              <div>
                <h3>Characters (Total: {totalActors})</h3>
                <span class="tooltip"
                  >Enter how many characters are in this play.</span
                > 
              </div>
              <div class="numbers">
                
                <br />
                <label for="numOfActors">Men:</label>
                <input
                  type="number"
                  id="numOfActors"
                  min="0"
                  name="numOfActors"
                  bind:value={formsData.numOfMales}
                  on:change={updateTotalAct}
                  
                />
                <br />
                <label for="numOfActors">Women:</label>
                <input
                  type="number"
                  id="numOfActors"
                  min="0"
                  name="numOfActors"
                  bind:value={formsData.numOfFemales}
                  on:change={updateTotalAct}
                  
                />
                <br />
                <label for="numOfActors">Neutral:</label>
                <input
                  type="number"
                  id="numOfActors"
                  min="0"
                  name="numOfActors"
                  bind:value={formsData.numOfNonSpecific}
                  on:change={updateTotalAct}
                  
                />
                <br />
                <div>
                    <h3>Playwright MetaData</h3>

                </div>
                <label for="numOfActors">Number of Pages</label>
                <input
                  type="number"
                  id="numOfActors"
                  min="0"
                  name="numOfpages"
                  bind:value={formsData.numOfPages}
                  on:change={updateTotalAct}
                  
                />
                <br />
              </div>
    
              
              <label for="toneOfPlay">Tone of Play:</label>
              
              <select class="filebox" name="toneOfPlay" id="toneOfPlay" bind:value={formsData.toneOfPlay} >
                  
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="classical">Classical</option>
                <option value="comedy">Comedy</option>
            
              </select>

            </div>
          </div>
  
          <div class="step-btns">
            <div />
            <button on:click={nextStep}>Next</button>
          </div>
        </StepWizard.Step>
        
        <StepWizard.Step num={2} let:previousStep let:nextStep>
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
                placeholder="Write a brief synopsis of your play."
                bind:value={formsData.synopsis}
                
              />
              <br />
              <label for="evaluator-comments">Evaluator Comments:</label>
              <br />
              <textarea
                name="evaluator-comments"
                id="evaluator-comments"
                cols="50%"
                rows="10"
                placeholder="What is the evaluator's opinion about the playwright?"
                bind:value={formsData.evaluatorComments}
                
              />
              <br />
              <label for="rating">Rating:</label>
              <br />
              <input type="number"
                id="rating"
                min="1"
                max="10"
                bind:value={formsData.rating}
                
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
    .evaluation {
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
      width: 100px;
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
    .numbers input  {
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
  