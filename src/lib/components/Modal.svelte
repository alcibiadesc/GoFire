<script>
	export let hideModal = true;
</script>

<div class="modal" class:hideModal>MODAL</div>

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
		background: white;
		z-index: 2;
	}
</style>
