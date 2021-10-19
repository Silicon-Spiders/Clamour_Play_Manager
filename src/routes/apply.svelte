    <svelte:head>
    <title>Apply</title>
    <!-- Main Script Submission Page -->
</svelte:head>

<form class="applcationform">
    <h3>Play Info</h3>
    <label><span> Play PDF:</span><input type="file" name="play_pdf" accept="application/pdf"></label>

    <label><span>Title:</span><input type="text" name="title"></label>
    <label><span>Tone of the Play:</span>
        <select name="tone">
            <option value="drama">Drama</option>
            <option value="comedy">Comedy</option>
        </select>
    </label>
    <label><span>Characters:</span>
        <textarea name="characters" cols="30%" rows="10" 
        placeholder="Please list all main characters"></textarea>
    </label>
    <label><span>Male Characters:</span><input type="number" name="title"></label>
    <label><span>Female Characters:</span><input type="number" name="title"></label>
    <label><span>Gender Non-Specifc Characters:</span><input type="number" name="title"></label>
    
    <label><span>Minimum Actors Needed:</span><input type="number" name="actor_count"></label>
    
    <label><span>Actor Count Explanation:</span>
        <textarea name="actor_explain" cols="30%" rows="10" 
        placeholder="Please explain which characters can be double casted by the same actor"></textarea>
    </label>
    
    <label><span>Synopsis:</span>
        <textarea name="synopsis" cols="30%" rows="6" placeholder="Write a brief synopsis of you play."></textarea>
    </label>
    
    <label><span>Play Improvements:</span>
        <textarea name="play_future" cols="30%" rows="6" placeholder="Where do you think you can improve this play and why?"></textarea>
    </label>
    <label><span>Next Steps in Development:</span>
        <textarea name="play_future" cols="30%" rows="6" placeholder="How do you plan to develop this play in the future?"></textarea>
    </label>
    
    
    <h3>Personal Details</h3>

    <label><span>Professional Introduction:</span> 
        <textarea name="prof_intro"cols="30%" rows="7" placeholder="What is you professional background?"></textarea>
    </label>
    <label><span>Personal Introduction:</span>
        <textarea name="person_intro" cols="30%" rows="7" placeholder="Tell us about yourself."></textarea>
    </label>
    
    <h3>Contact Information</h3>
    <label><span>First Name:</span><input type="text" name="title"></label>
    <label><span>Last Name:</span><input type="text" name="title"></label>
    <label><span>Country:</span><input type="text" name="title"></label>
    <label><span>Street Address:</span><input type="text" name="title"></label>
    <label><span>City:</span><input type="text" name="title"></label>
    <label><span>Zip:</span><input type="text" name="title"></label>
    <label><span>Primary Phone Number:</span><input type="text" name="title"></label>
    <label><span>Email:</span><input name="email" type="email"></label>
    <label><span>Meeting Preference:</span>
        <select name="meet_preferences">
            <option value="physical">In person</option>
            <option value="online">Online</option>
        </select>
    </label>

    <button type="submit"> <h3>Finish & Submit</h3></button>
</form>

<style>
    .applcationform{
        width: 600px;
        margin: auto;
    }
    label {
        display:block;
        position:relative;
        padding-left:240px; /* adjust if necessary */
        padding-bottom: 5px;
    }
    label > span {
        position:absolute;
        left:0;
    }
    button{
        margin-top: 20px;
    }
</style>