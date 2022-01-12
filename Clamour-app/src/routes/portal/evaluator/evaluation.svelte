<script>


</script>

<svelte:head>
    <title>Evaluation</title>

</svelte:head>

    <form>
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
                <td class="numbers" >
                    
                    <label for="num-pages">Number of pages:</label>
                    <input type="number" id="num-pages" name="num-pages" min="5" max="50">
                    <br><br>
    
                    <label for="title">Number of Female Characters:</label>
                    <input type="number" id="num-female" name="num-female" min="0" max="10">
                    <br><br>
    
                    <label for="actor_count">Number of Male Characters</label>
                    <input type="number" id="num-male" name="num-male" min="0" max="10">
                    <br><br>
    
                    <label for="actor_explain">Number of non-Specific Characters:</label>
                    <input type="number" id="num-nonspecific-actors" min="0" max="10">
                    <br><br>
    
                   
    
                    <label for="tone">Tone of the Play: </label>
                    <select name="tone" id="tone">
                        <option value="drama">Drama</option>
                        <option value="comedy">Comedy</option>
                        <option value="comic">Comic</option>
                    </select>
    
                </td>
                <!-- <td>
                
                    <label for="prof_intro">Professional Introduction:</label>
                    <br>
                    <textarea name="prof_intro" id="prof_intro" cols="30%" rows="7" placeholder="What is you professional background?"></textarea>
                    <br>
                    <label for="person_intro">Personal Introduction:</label>
                    <br>
                    <textarea name="person_intro" id="person_intro" cols="30%" rows="7" placeholder="Tell us about yourself."></textarea>
                
                </td> -->
                <td class="extra-info">
                    <label for="synopsis">Synopsis:</label>
                    <br>
                    <textarea name="synopsis" id="synopsis" cols="30%" rows="6" placeholder="Write a brief synopsis of the play."></textarea>
                    <br>
                    <label for="evaluator-comment">Evaluators Comments:</label>
                    <br>
                    <textarea name="evaluator-comment" id="evaluator-comment" cols="30%" rows="6" placeholder="What is the evaluator's opinion about the playwright?"></textarea>
                    <br>
                    <label for="rating">Rating(1-10): </label>
                    <input type="number" id="rating" min="1" max="10">
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
