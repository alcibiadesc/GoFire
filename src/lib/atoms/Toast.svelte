<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';

	export let type: 'success' | 'error' | 'warning' | 'info' = 'info';
	export let message: string = '';
	export let duration: number = 4000;
	export let dismissible: boolean = true;

	const dispatch = createEventDispatcher();

	const icons = {
		success: 'check',
		error: 'delete',
		warning: 'highlight',
		info: 'info'
	};

	onMount(() => {
		if (duration > 0) {
			const timer = setTimeout(() => {
				dispatch('dismiss');
			}, duration);
			return () => clearTimeout(timer);
		}
	});
</script>

<div
	class="toast toast--{type}"
	role="alert"
	aria-live="polite"
	in:fly={{ y: -20, duration: 200 }}
	out:fade={{ duration: 150 }}
>
	<div class="toast__icon">
		<img src="/icons/{icons[type]}.svg" alt={type} />
	</div>
	<span class="toast__message">{message}</span>
	{#if dismissible}
		<button
			class="toast__close"
			on:click={() => dispatch('dismiss')}
			aria-label="Dismiss notification"
		>
			<img src="/icons/close.svg" alt="close" />
		</button>
	{/if}
</div>

<style>
	.toast {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		border-radius: 12px;
		background: var(--background-secondary);
		border: 1px solid var(--border-color);
		box-shadow: var(--shadow-lg);
		min-width: 280px;
		max-width: 400px;
	}

	.toast__icon {
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.toast__icon img {
		width: 1.25rem;
		height: 1.25rem;
	}

	.toast--success .toast__icon img {
		filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(118deg) brightness(104%) contrast(86%);
	}

	.toast--error .toast__icon img {
		filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(336deg) brightness(95%) contrast(95%);
	}

	.toast--warning .toast__icon img {
		filter: invert(67%) sepia(61%) saturate(1000%) hue-rotate(359deg) brightness(103%) contrast(96%);
	}

	.toast--info .toast__icon img {
		filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(207deg) brightness(100%) contrast(95%);
	}

	.toast__message {
		flex: 1;
		font-size: 0.9rem;
		color: var(--primary);
		line-height: 1.4;
	}

	.toast__close {
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		opacity: 0.6;
		transition: opacity 0.2s ease;
		flex-shrink: 0;
	}

	.toast__close:hover {
		opacity: 1;
	}

	.toast__close img {
		width: 1rem;
		height: 1rem;
		filter: brightness(0) invert(0.6);
	}

	.toast--success {
		border-color: var(--success);
		background: linear-gradient(145deg, var(--background-secondary), rgba(16, 185, 129, 0.1));
	}

	.toast--error {
		border-color: var(--danger);
		background: linear-gradient(145deg, var(--background-secondary), rgba(239, 68, 68, 0.1));
	}

	.toast--warning {
		border-color: var(--warning);
		background: linear-gradient(145deg, var(--background-secondary), rgba(245, 158, 11, 0.1));
	}

	.toast--info {
		border-color: var(--info);
		background: linear-gradient(145deg, var(--background-secondary), rgba(59, 130, 246, 0.1));
	}
</style>
