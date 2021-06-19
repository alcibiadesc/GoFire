<script>
	import { format } from "./../../scripts.js";
	import ModalSavings from "./../components/ModalSavings.svelte";
	import ChartLine from "./../atoms/ChartLine.svelte";
	import Button from "./../atoms/Button.svelte";

	export let edit = false;
	export let details = [];
	export let props = {
		id: "9c72c81f-480d-4575-bdff-45e50afc7a33",
		title: "Total Title",
		revenue: 0,
		number: 0,
		percent: 0,
		hightlight: false,
		saving: [{ date: "2020-02-08", amount: 0 }],
	};

	let { id, title, revenue, number, percent, hightlight, saving } = props;

	let hideModal = true;
	const toogleModal = () => (hideModal = !hideModal);

	const actions = {
		remove: () => details.remove(id),
		changeName: () => details.change(id, "title", title),
		changeNumber: () => details.change(id, "number", number),
		changeHigh: () => details.change(id, "hightlight", hightlight),
		toogleHigh: () => {
			hightlight = !hightlight;
			changeHigh();
		},
	};
	const { changeName, changeNumber, changeHigh, remove, toogleHigh } = actions;

	const btns = [
		{ icon: "delete", style: "tertiary", onClick: remove },
		{ icon: "highlight", style: "tertiary", onClick: toogleHigh },
		{ icon: "saving", style: "tertiary", onClick: toogleModal },
	];
</script>

<ModalSavings {hideModal} {title} {id} onClick={details.saving} />

<div class="w-64 m-3 relative" class:hightlight>
	{#if edit}
		<input
			name="title"
			on:change={changeName}
			bind:value={title}
			class="title w-64"
			type="text"
		/>

		<div class="data">
			<input
				name="number"
				on:change={changeNumber}
				bind:value={number}
				type="number"
			/>
			<ChartLine />
			<p class="percent">{percent}</p>
		</div>
		<div class=" flex flex-row float-right">
			{#each btns as btn}
				<div>
					<Button props={btn} />
				</div>
			{/each}
		</div>
	{:else}
		<h6 class="mb-1">{title}</h6>
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
