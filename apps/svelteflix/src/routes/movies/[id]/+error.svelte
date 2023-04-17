<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="column container">
	<h1>{$page.status}</h1>
	<p>Movie could not be found</p>
</div>

<style>
    
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    h1 {
        font-size: 3em;
        margin-bottom: 0.5em;
    }
</style>
