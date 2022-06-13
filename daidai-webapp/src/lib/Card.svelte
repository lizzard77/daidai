<script>
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    export let front = "";
    export let back = "?";
    export let showFront = false;	
    export let found = false;
    export let id = 0;

    function flipEffect(node, { delay = 0, duration = 300 }) {
		return {
			delay,
			duration,
			css: (t, u) => `
				transform: rotateY(${1 - (u * 180)}deg);
				opacity: ${1 - u};
			`
		};
	}

    function flip() {
        if (found)
            return;
        showFront = !showFront;
		dispatch('flip', { id });
	}
</script>
			
<div class="w-24 h-24 m-1 relative" on:click={flip}>
    {#if showFront}
        <div transition:flipEffect class="side bg-orange-500"><img src="/assets/male_{front}.jpg" alt="" /></div>
    {:else if !found}
        <div transition:flipEffect class="side bg-black" title={front}>{back}</div>
    {:else}
        <div class="side bg-slate-500"></div>
    {/if}
</div>

<style>
    .side {
		position: absolute;
		height: 100%;
		width: 100%;
		overflow: hidden;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>