<script>
	export let icon = "menu";
	export let style = "primary";
	import { formatBasic } from "./../../scripts";
	export let placeholder = "objetivo";
	export let value = "";
	export let label = "";
</script>

<div>
	<label>
		{label}
	</label>
	<br />
	<input bind:value class="input__{style} inp-icon" {placeholder} />
</div>

<style>
	label {
		color: var(--secondary);
		font-size: 0.75rem;
		margin-left: 1rem;
	}
	div {
		margin-top: 2rem;
	}
	.input__primary {
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
		background-size: 26px;
		background-color: #656565;
	}
</style>
