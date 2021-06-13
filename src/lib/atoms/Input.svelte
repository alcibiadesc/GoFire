<script>
	export let icon = "menu";
	export let style = "primary";
	export let placeholder = "objetivo";
	export let value = "";
</script>

<input bind:value class="input__{style} inp-icon" {placeholder} />

<style>
	.input__primary {
		margin-top: 2rem;
		height: 2rem;
		padding: 1rem;
		padding-right: 50px;
		border-radius: 15px;
	}

	input,
	textarea {
		color: var(--primary);
	}

	.inp-icon {
		background: url(icons/goal.svg) no-repeat 98%;
		filter: grayscale(100%);
		background-size: 26px;
		background-color: teal;
	}
</style>
