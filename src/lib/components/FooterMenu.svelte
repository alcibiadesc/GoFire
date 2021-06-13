<script>
	import Button from "../atoms/Button.svelte";

	const buttons = [
		{ icon: "home", style: "secondary", selected: false },
		{ icon: "lightning", style: "secondary", selected: false },
		{ icon: "profile", style: "secondary", selected: false },
		{ icon: "bell", style: "secondary", selected: false },
	];

	let current = "profile";
	const selectedBtn = (icon) => {
		current = icon;
	};
</script>

<div class="container">
	{#each buttons as props}
		<Button {props} {current} on:click={() => selectedBtn(props.icon)} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		justify-content: space-around;
		background: linear-gradient(#383e43, var(--background));
		padding: 25px;
		border-radius: 50px;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>
