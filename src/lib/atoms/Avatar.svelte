<script>
	import { landing } from "./../../stores/landing";
	export let img = "icons/user.svg";
	export let onClick = () => console.log("click avatar");
	export let toogleGuide = () => {};
	export let guide = false;
</script>

{#if $landing == false}
	{#if guide}
		<button on:click={toogleGuide}>
			<img class="inline-block" src="/icons/close.svg" alt="close" />
		</button>
	{:else}
		<button on:click={toogleGuide}>
			<img class="inline-block" src="/icons/help.svg" alt="help" />
		</button>
	{/if}
{/if}
<button on:click={onClick}>
	<img
		class=" inline-block w-12 h-12 rounded-full {img === 'icons/user.svg'
			? 'filter'
			: ''}"
		src={img}
		alt="Avatar"
	/>
</button>

<style>
	.filter {
		filter: var(--filter);
	}

	button:hover {
		opacity: 0.8;
	}
</style>
