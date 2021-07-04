<script>
	export let hideModal = true;
	import Card from "./../atoms/Card.svelte";
	import Button from "./../atoms/Button.svelte";
	const toogleModal = () => (hideModal = !hideModal);
	const btnClose = { icon: "delete", style: "tertiary", onClick: toogleModal };
</script>

<div class={hideModal ? "hideModal" : "modal"}>
	<Card>
		<div class="btn--close">
			<Button prop={btnClose} />
		</div>
		<slot />
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
		margin: 0;
		width: 100vw;
		height: 90%;
		justify-content: center;
		align-items: center;
		background: var(--background);
		z-index: 2;
		display: grid;
		place-items: center;
		overflow-y: scroll;
	}

	.btn--close {
		display: grid;
		place-items: end;
	}
</style>
