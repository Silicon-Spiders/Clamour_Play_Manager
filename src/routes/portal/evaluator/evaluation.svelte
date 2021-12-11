<script>

export async function handleSubmit(e) {


let JSONobj = {};
let formData = new FormData(e.target);

formData.forEach( (value, key) => {

JSONobj[key] = value;
});


console.log(JSONobj);

for (let key in JSONobj) {
    if (!JSONobj.hasOwnProperty(key)) {
        // console.log(key + " -> " + JSONobj[key]);

        alert('A missing field has been detected. Please fill all the fields');
        return;
    } 
    else {

        //if all the values in the JSONobj exist then send the info to the database

        // const resultFromDb;

        window.location.replace('./success');

    }
}

   

};


async function postData( url = '' , dataObj = {} ) {

    // const response = await fetch(url , {


    //     method: 'POST',
    //     mode: 'cors',
    //     credentials: 'same-origin',
    //     headers: {

    //         'Content-Type': 'application/json'
    //     },

    //     body: JSON.stringify(dataObj)
    // });
    // return response.json();

}
</script>

<svelte:head>
    <title>Evaluation</title>

</svelte:head>

    <form on:submit|preventDefault={handleSubmit}>
        <table align="center" style="width: 60%;" >
            <colgroup>
                <col span="1" style="width: 60%;">
                <col span="1" style="width: 10%;">
            </colgroup>
    
            <th align="left">
                <h4>Play Info</h4>
            </th>
            <th align="left">
                <h4>Personal Details</h4>
            </th>
           
            <tr>
                <td class="numbers">
                    
                    <label for="num-pages">Number of pages:</label>
                    <input type="number" id="num-pages" name="num-pages" min="5" max="50" required>
                    <br><br>
    
                    <label for="title">Number of Female Characters:</label>
                    <input type="number" id="num-female" name="num-female" min="0" max="10" required>
                    <br><br>
    
                    <label for="actor_count">Number of Male Characters</label>
                    <input type="number" id="num-male" name="num-male" min="0" max="10" required>
                    <br><br>
    
                    <label for="actor_explain">Number of non-Specific Characters:</label>
                    <input type="number" id="num-nonspecific-actors" min="0" max="10" required>
                    <br><br>
    
                   
    
                    <label for="tone">Tone of the Play: </label>
                    <select name="tone" id="tone">
                        <option value="drama">Drama</option>
                        <option value="comedy">Comedy</option>
                        <option value="comic">Comic</option>
                    </select>
    
                </td>
               
                <td class="extra-info">
                    <label for="synopsis">Synopsis:</label>
                    <br>
                    <textarea name="synopsis" id="synopsis" cols="30%" rows="6" placeholder="Write a brief synopsis of the play." required></textarea>
                    <br>
                    <label for="evaluator-comment">Evaluators Comments:</label>
                    <br>
                    <textarea name="evaluator-comment" id="evaluator-comment" cols="30%" rows="6" placeholder="What is the evaluator's opinion about the playwright?" required></textarea>
                    <br>
                    <label for="rating">Rating(1-10): </label>
                    <input type="number" id="rating" min="1" max="10" required>
                    <br>
                    <button type="submit">Submit</button>
                </td>
            </tr>
        </table>
    
    </form>



<style>

.numbers{

    margin:100px;
    padding-top: 10px;
    padding-bottom: 105px;
}

.extra-info {

    margin: 5px;
    width: 10px;
}
</style>
