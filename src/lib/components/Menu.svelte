<script>
	import Button from "../atoms/Button.svelte";

	const buttons = [
		{ icon: "home", style: "secondary", selected: false },
		{ icon: "lightning", style: "secondary", selected: false },
		{ icon: "chart", style: "secondary", selected: false },
		{ icon: "tune", style: "secondary", selected: false },
	];

	export let current = "Home";
	export let selectedBtn = (icon) => {
		console.log(icon);
	};
</script>

<div data-testid="menu" class="container fixed">
	{#each buttons as prop}
		<Button {prop} {current} on:click={() => selectedBtn(prop.icon)} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		justify-content: space-around;
		background: var(--card__background);
		padding: 25px;
		border-radius: 50px;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 20;
	}
</style>
