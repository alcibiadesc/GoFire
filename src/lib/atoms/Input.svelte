<script>
	export let style = "primary";
	export let placeholder = "0";
	export let value = "";
	export let label = "";
	export let type = "number";
</script>

<div>
	<h3 class="mt-8 mb-1">
		{label}
	</h3>

	{#if type === "number"}
		<input
			bind:value
			type="number"
			class="color input__{style} "
			{placeholder}
		/>
	{:else if type === "date"}
		<input
			bind:value
			type="date"
			class="color input__{style}"
			{placeholder}
		/>
	{:else if type === "text"}
		<input
			bind:value
			type="text"
			class="color input__{style} "
			{placeholder}
		/>
	{/if}
</div>

<style>
	div {
		margin-top: 2rem;
	}

	.input__primary {
		height: 2rem;
		padding: 1rem;
		border-radius: 15px;
		width: 12rem;
	}

	input[type="date"]::-webkit-calendar-picker-indicator {
		filter: invert(1);
		opacity: 0.8;
	}

	input[type="date"]::-webkit-calendar-picker-indicator:hover {
		opacity: 1;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type="number"] {
		-moz-appearance: textfield;
	}
	.color {
		color: var(--primary);
		background: var(--background__input);
	}
</style>
