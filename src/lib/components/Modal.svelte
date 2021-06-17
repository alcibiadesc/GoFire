<script>
	export let hideModal = true;
	import Card from "./../atoms/Card.svelte";
	import Input from "./../atoms/Input.svelte";
	import Button from "./../atoms/Button.svelte";

	const toogleModal = () => (hideModal = !hideModal);
	const btnSave = {
		icon: "saving",
		style: "secondary",
		onClick: toogleModal,
	};

	const btnClose = { icon: "delete", style: "tertiary", onClick: toogleModal };
</script>

<div class={hideModal ? "hideModal" : "modal"}>
	<Card>
		<div class="btn--close">
			<Button props={btnClose} />
		</div>
		<h1>Añade un importe</h1>
		<Input label="añade la cantidad" />
		<input class="my-5" type="date" />

		<div class="btn--save">
			<Button props={btnSave} />
		</div>
	</Card>
</div>

<style>
	.hideModal {
		display: none;
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		background: var(--background);
		z-index: 2;
		display: grid;
		place-items: center;
	}

	input {
		border-radius: 50px;
		text-align: center;
		font-size: 1rem;
		background: var(--background);
		color: var(--primary);
	}

	.btn--close {
		display: grid;
		place-items: end;
	}

	.btn--save {
		display: grid;
		place-items: center;
	}
</style>
