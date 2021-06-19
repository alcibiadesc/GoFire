<script>
	import Modal from "./../atoms/Modal.svelte";
	import { today } from "./../../scripts.js";
	export let hideModal = true;
	export let onClick = () => console.log("click");

	import Input from "./../atoms/Input.svelte";
	import Button from "./../atoms/Button.svelte";
	export let title = "Title";

	let amount = 0;
	const toogleModal = () => (hideModal = !hideModal);
	const btnSave = {
		icon: "saving",
		style: "modal",
		onClick: () => {
			toogleModal();
			onClick(today, amount);
		},
	};

	let date = today;
</script>

<Modal {hideModal}>
	<h1 class="noselect">{title}</h1>
	<Input bind:value={amount} label="añade la cantidad" />
	<input bind:value={date} class="my-5" type="date" />

	<div class="btn--save">
		<Button props={btnSave} />
	</div>
</Modal>

<style>
	input {
		border-radius: 50px;
		text-align: center;
		font-size: 1rem;
		background: var(--background);
		color: var(--primary);
	}

	.btn--save {
		display: grid;
		place-items: center;
	}
</style>
