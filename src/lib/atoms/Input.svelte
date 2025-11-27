<script>
	export let style = "primary";
	export let placeholder = "0";
	export let value = "";
	export let label = "";
	export let type = "number";
</script>

<div class="input-wrapper">
	{#if label}
		<label class="input-label">{label}</label>
	{/if}

	{#if type === "number"}
		<input
			bind:value
			type="number"
			class="input input__{style}"
			{placeholder}
		/>
	{:else if type === "date"}
		<input
			bind:value
			type="date"
			class="input input__{style}"
			{placeholder}
		/>
	{:else if type === "text"}
		<input
			bind:value
			type="text"
			class="input input__{style}"
			{placeholder}
		/>
	{/if}
</div>

<style>
	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-label {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--tertiary);
	}

	.input {
		height: 2.75rem;
		padding: 0 1rem;
		border-radius: 12px;
		border: 1px solid var(--border-color);
		color: var(--primary);
		background: var(--background__input);
		font-size: 0.95rem;
		font-weight: 500;
		transition: all 0.2s ease;
		width: 100%;
	}

	.input:hover {
		border-color: rgba(255, 255, 255, 0.15);
	}

	.input:focus {
		outline: none;
		border-color: var(--secondary);
		box-shadow: 0 0 0 3px rgba(232, 76, 43, 0.15);
	}

	.input__primary {
		max-width: 200px;
	}

	.input__full {
		max-width: 100%;
	}

	input[type="date"]::-webkit-calendar-picker-indicator {
		filter: invert(1);
		opacity: 0.7;
		cursor: pointer;
	}

	input[type="date"]::-webkit-calendar-picker-indicator:hover {
		opacity: 1;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}

	input::placeholder {
		color: var(--tertiary);
		opacity: 0.6;
	}
</style>
