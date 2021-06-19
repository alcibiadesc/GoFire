<script>
	import { format } from "./../../scripts.js";
	import ModalSavings from "./../components/ModalSavings.svelte";
	import ChartLine from "./../atoms/ChartLine.svelte";
	import Button from "./../atoms/Button.svelte";

	export let edit = false;
	export let details = [];
	export let props = {
		id: "9c72c81f-480d-4575-bdff-45e50afc7a33",
		title: "Beneficios",
		revenue: 0,
		number: 0,
		percent: 0,
		hightlight: true,
		saving: [{ date: "2020-02-08", amount: 0 }],
	};

	let { id, title, revenue, number, percent, hightlight, saving } = props;
</script>

<div class="w-64 m-3 relative m-6" class:hightlight>
	<h6 class="mb-1">{title}</h6>
	<div class="data">
		<p class="euros">{format(number)}</p>
		<ChartLine />
		<p class="percent">{percent}</p>
	</div>
</div>

<style>
	.title {
		border: none;
		width: 100%;
		color: var(--tertiary);
	}
	.percent {
		color: var(--secondary);
		font-size: 1em;
		margin-left: 1rem;
	}
	.hightlight:after {
		content: "";
		background: var(--secondary);
		position: absolute;
		width: 1px;
		height: 100%;
		top: 0;
		left: -20px;
	}

	.data {
		display: flex;
		justify-content: center;
		flex-direction: row;
	}

	button {
		color: var(--tertiary);
	}
</style>
