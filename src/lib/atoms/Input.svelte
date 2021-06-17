<script>
	export let icon = "menu";
	export let style = "primary";
	import { formatBasic } from "./../../scripts";
	export let placeholder = "0€";
	export let value = "";
	export let label = "";
	export let type = "number";
</script>

<div>
	<h3 class="mt-8 mb-1">
		{label}
	</h3>
	<input
		bind:value
		type="number"
		class="input__{style} inp-icon"
		{placeholder}
	/>
</div>

<style>
	div {
		margin-top: 2rem;
	}
	.input__primary {
		height: 2rem;
		padding: 1rem;
		border-radius: 15px;
	}

	input,
	textarea {
		color: var(--primary);
	}

	.inp-icon {
		background: url(icons/goal.svg) no-repeat 98%;
		background-size: 26px;
		background-color: #656565;
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
</style>
