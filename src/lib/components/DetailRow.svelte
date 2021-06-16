<script>
	import { format } from "./../../scripts.js";
	import { details } from "./../../stores/data.js";
	import ChartLine from "./../atoms/ChartLine.svelte";
	export let props = {
		id: "9c72c81f-480d-4575-bdff-45e50afc7a33",
		title: "Total Title",
		number: 0,
		percent: 0,
		hightlight: false,
	};

	let { title, number, percent, hightlight, id } = props;
	export let edit = false;

	const deleteRow = () => {
		$details = $details.filter((element) => element.id !== id);
	};

	const row = $details.filter((ele) => ele.id === id)[0];

	const toogleHightlight = () => {
		row.hightlight = !row.hightlight;
		hightlight = !hightlight;
	};
</script>

<div class="w-64 m-3 relative" class:hightlight>
	{#if edit}
		<input class="title w-64" bind:value={row.title} type="text" />
	{:else}
		<h6>{title}</h6>
	{/if}

	<div class="data">
		{#if edit}
			<input bind:value={row.number} type="text" />
		{:else}
			<p class="euros">{format(number)}</p>
		{/if}

		<ChartLine />

		<p class="percent">{percent}</p>
	</div>

	{#if edit}
		<div class=" flex flex-col rounded-lg float-right">
			<button on:click={deleteRow}>eliminar</button>
			<button on:click={toogleHightlight}>resaltar</button>
		</div>
	{/if}
</div>

<style>
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
