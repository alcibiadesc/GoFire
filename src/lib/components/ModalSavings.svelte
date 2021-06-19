<script>
	import Modal from "./../atoms/Modal.svelte";
	import { today } from "./../../scripts.js";
	export let hideModal = true;
	export let onClick;

	import Input from "./../atoms/Input.svelte";
	import Button from "./../atoms/Button.svelte";
	export let title = "Title";
	export let id = "0";

	let amount = 0;
	const toogleModal = () => (hideModal = !hideModal);
	const btnSave = {
		icon: "saving",
		style: "modal",
		onClick: () => {
			toogleModal();
			onClick(id, today, amount);
		},
	};

	let date = today;
</script>

<Modal {hideModal}>
	<h1 class="noselect text-2xl">{title}</h1>
	<Input bind:value={amount} label="añade la cantidad" type="number" />
	<Input bind:value={date} label="¿Cuándo añadiste los fondos?" type="date" />

	<div class="btn--save mt-9">
		<Button props={btnSave} />
	</div>
</Modal>

<style>
	input {
		border-radius: 50px;
		text-align: center;
		font-size: 1rem;
		background: var(--background__input);
		color: var(--primary);
	}

	.btn--save {
		display: grid;
		place-items: center;
	}
</style>
