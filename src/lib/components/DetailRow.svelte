<script>
	import { format } from "./../../scripts.js";
	import Modal from "./../components/Modal.svelte";
	import ChartLine from "./../atoms/ChartLine.svelte";

	export let edit = false;
	export let props = {
		id: "9c72c81f-480d-4575-bdff-45e50afc7a33",
		title: "Total Title",
		revenue: 0,
		number: 0,
		percent: 0,
		hightlight: false,
	};

	export let details = [{}];

	let { title, number, percent, hightlight, id, revenue } = props;

	const row = $details.filter((element) => element.id === id)[0];
	const toogleHightlight = () => {
		row.hightlight = !row.hightlight;
		hightlight = !hightlight;
	};

	const deleteRow = () => {
		$details = $details.filter((element) => element.id !== id);
	};

	let hideModal = true;

	const toogleModal = () => (hideModal = !hideModal);
</script>

<div class="w-64 m-3 relative" class:hightlight>
	{#if edit}
		<input class="title w-64" bind:value={row.title} type="text" />

		<div class="data">
			<input bind:value={row.number} type="number" />
			<ChartLine />
			<p class="percent">{percent}</p>
		</div>
		<div class=" flex flex-col rounded-lg float-right">
			<button on:click={deleteRow}>eliminar</button>
			<button on:click={toogleHightlight}>resaltar</button>
			<button on:click={toogleModal}>añadir fondos</button>
		</div>
	{:else}
		<h6>{title}</h6>
		<div class="data">
			<p class="euros">{format(number)}</p>
			<ChartLine />
			<p class="percent">{percent}</p>
		</div>
	{/if}
	{#if revenue}
		<h3 class="mt-1 revenue text-sm">Rentabilidad: {format(revenue)}</h3>
	{/if}
</div>

<Modal {hideModal} />

<style>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type="number"] {
		-moz-appearance: textfield;
	}
	.title {
		border: none;
		width: 100%;
		color: var(--tertiary);
	}
	input {
		background: none;
		border-bottom: 1px solid var(--tertiary);
		color: var(--primary);
		margin-right: 2rem;
		width: 8rem;
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
