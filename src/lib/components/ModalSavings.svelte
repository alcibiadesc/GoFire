<script>
	import Modal from "./../atoms/Modal.svelte";
	import { today } from "./../../scripts.js";
	export let hideModal = true;
	export let save = () => {};
	export let savings = [];
	export let removeSaving = () => {};

	import Input from "./../atoms/Input.svelte";
	import Button from "./../atoms/Button.svelte";
	import Tooltip from "../atoms/Tooltip.svelte";
	import Table from "../atoms/Table.svelte";
	export let title = "Title";
	export let id = "0";

	let historial = false;
	const toogleHistorial = () => (historial = !historial);

	let amount = 0;
	const btns = [
		{
			icon: "history",
			label: "Ver el historial ",
			style: "modal",
			onClick: toogleHistorial,
		},
		{
			icon: "saving",
			label: "Guardar Datos",
			style: "modal",
			onClick: () => {
				save(id, date, amount);
			},
		},
	];

	let date = today;

	$: savingsSorted = savings.sort((a, b) => {
		a = a.today.split("-").join("");
		b = b.today.split("-").join("");
		return b - a;
	});
</script>

<Modal {hideModal}>
	<h1 class="noselect text-2xl">{title}</h1>
	<Input bind:value={amount} label="añade la cantidad" type="number" />
	<Input bind:value={date} label="¿Cuándo añadiste los fondos?" type="date" />

	{#if savings.length > 0}
		<div class="float-right  mt-5 flex flex-row">
			{#each btns as { label, icon, style, onClick }}
				<Tooltip {label}>
					<Button prop={{ icon, style, onClick }} />
				</Tooltip>
			{/each}
		</div>

		<div class:hide={!historial} class="mt-20">
			<Table savings={savingsSorted} {removeSaving} {id} />
		</div>
	{:else}
		<div class="float-right  mt-5 flex flex-row">
			<Button prop={btns[1]} />
		</div>
	{/if}
</Modal>

<style>
	input {
		border-radius: 50px;
		text-align: center;
		font-size: 1rem;
		background: var(--background__input);
		color: var(--primary);
	}

	.hide {
		display: none;
	}
</style>
