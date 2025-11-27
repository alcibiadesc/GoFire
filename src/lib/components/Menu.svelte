<script lang="ts">
	import Button from '../atoms/Button.svelte';

	interface ButtonConfig {
		icon: string;
		style: string;
		selected: boolean;
	}

	const buttons: ButtonConfig[] = [
		{ icon: 'home', style: 'secondary', selected: false },
		{ icon: 'chart', style: 'secondary', selected: false },
		{ icon: 'saving', style: 'secondary', selected: false },
		{ icon: 'tune', style: 'secondary', selected: false },
	];

	export let current: string = 'home';
	export let selectedBtn: (icon: string) => void = () => {};
</script>

<nav data-testid="menu" class="menu-container">
	<div class="menu-inner">
		{#each buttons as prop}
			<Button {prop} {current} on:click={() => selectedBtn(prop.icon)} />
		{/each}
	</div>
</nav>

<style>
	.menu-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0.75rem 1rem;
		padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
		background: linear-gradient(
			to top,
			var(--background) 0%,
			var(--background) 70%,
			transparent 100%
		);
		z-index: 50;
	}

	.menu-inner {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: var(--card__background);
		padding: 1rem 1.5rem;
		border-radius: 28px;
		max-width: 400px;
		margin: 0 auto;
		border: 1px solid var(--border-color);
		box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3);
	}
</style>
