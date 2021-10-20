<script>
    export let checkbox;
</script>

<div class="play-container">
    <span class:show={checkbox}>
        <input type="checkbox" />
    </span>
    <span>
        <slot name="title" />
    </span>
    <span>
        <slot name="rating" />
    </span>
    <span>
        <slot name="tone" />
    </span>
    <span>
        <slot name="actors" />
    </span>
    <span>
        <slot name="pages" />
    </span>
    <span>
        <slot name="authorFirstName" />
    </span>
    <span>
        <slot name="authorLastName" />
    </span>
    <span>
        <slot name="authorGender" />
    </span>
    <span>
        <slot name="authorEthnicity" />
    </span>
    <span>
        <slot name="authorRegion" />
    </span>
</div>

<style>
    .play-container {
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
</style>
