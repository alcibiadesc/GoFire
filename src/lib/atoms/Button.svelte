<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface ButtonProp {
		icon: string;
		style: 'primary' | 'secondary' | 'tertiary' | 'move' | 'modal';
		onClick?: () => void;
	}

	export let prop: ButtonProp = {
		icon: 'menu',
		style: 'primary',
		onClick: () => {},
	};

	export let current: string = '';

	const dispatch = createEventDispatcher();

	$: isSelected = current === prop.icon;

	const handleClick = () => {
		prop.onClick?.();
		dispatch('click');
	};
</script>

<button
	class="btn {prop.style}"
	class:selected={isSelected}
	on:click={handleClick}
	aria-label={prop.icon}
	type="button"
>
	<img
		class="icon"
		class:selected__icon={isSelected}
		src="/icons/{prop.icon}.svg"
		alt={prop.icon}
	/>
</button>

<style>
	.btn {
		display: grid;
		place-items: center;
		border: none;
		background: transparent;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn:hover {
		opacity: 0.8;
	}

	.btn:active {
		transform: scale(0.95);
	}

	.icon {
		width: 1.75rem;
		height: 1.75rem;
		filter: brightness(0) invert(1);
		opacity: 0.7;
		transition: all 0.2s ease;
	}

	.primary {
		padding: 0.75rem;
		border-radius: 12px;
		background: var(--card__background);
	}

	.primary .icon {
		width: 1.5rem;
		height: 1.5rem;
	}

	.secondary {
		padding: 0.75rem;
		border-radius: 12px;
	}

	.secondary:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.tertiary {
		padding: 0.25rem;
	}

	.tertiary .icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	.tertiary:hover .icon {
		filter: var(--filter);
	}

	.move {
		padding: 0.25rem;
	}

	.move .icon {
		width: 1rem;
		height: 1rem;
	}

	.move:hover .icon {
		filter: var(--filter);
	}

	.modal {
		padding: 0.5rem;
	}

	.modal:hover .icon {
		filter: var(--filter);
	}

	.selected {
		background: var(--secondary);
		border-radius: 50%;
	}

	.selected .icon,
	.selected__icon {
		opacity: 1;
		filter: brightness(0) invert(1);
	}
</style>
