<script>
	import { toast } from '../../stores/toast.js';
	import Toast from './Toast.svelte';
</script>

<div class="toast-container" aria-live="polite" aria-label="Notifications">
	{#each $toast as item (item.id)}
		<Toast
			type={item.type}
			message={item.message}
			duration={item.duration}
			on:dismiss={() => toast.dismiss(item.id)}
		/>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		pointer-events: none;
	}

	.toast-container :global(.toast) {
		pointer-events: auto;
	}

	@media (max-width: 480px) {
		.toast-container {
			top: auto;
			bottom: 1rem;
			left: 1rem;
			right: 1rem;
		}

		.toast-container :global(.toast) {
			max-width: none;
			width: 100%;
		}
	}
</style>
