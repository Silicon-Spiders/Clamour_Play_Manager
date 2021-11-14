<script>
    export let checkbox;
</script>

<div class="play-container">
    <span class:show={checkbox}>
        <input type="checkbox" />
    </span>
    <span> Title </span>
    <span> Rating </span>
    <span> Tone </span>
    <span> Actors </span>
    <span> Pages </span>
    <span> First Name </span>
    <span> Last Name </span>
    <span> Gender </span>
    <span> Ethnicity </span>
    <span> Region </span>
</div>

<style>
    .play-container {
        text-align: center;
        padding: 1.5% 1%;
        border-bottom: thin solid var(--secondary-color-dark);
    }
    .play-container span {
        display: inline-block;
        font-size: 16pt;
        margin: 0% 1.7%;
    }
    .play-container input {
        display: none;
    }
    .show input {
        display: inline-block;
    }
    .play-heading-container {
        border-bottom: thin solid var(--secondary-color-dark);
        padding: 1.5% 1%;
        margin: 0% 2%;
    }
</style>
