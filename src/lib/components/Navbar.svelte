<script lang="ts">
	import { user } from '../../stores/user.js';
	import { signIn } from '../../firebase/firebase-auth.js';
	import Avatar from '../atoms/Avatar.svelte';
	import { landing } from '../../stores/landing.js';

	$: img = $user?.photoURL || '/icons/user.svg';

	export let toggleGuide: () => void = () => {};
	export let guide: boolean = false;
	export let quitGuide: () => void = () => {};

	const activeLanding = () => {
		$landing = true;
		quitGuide();
	};
</script>

<header class="navbar">
	<div class="navbar-content">
		<div class="navbar-left">
			{#if !$landing}
				<button class="logo-btn" on:click={activeLanding} aria-label="Go to landing">
					<img class="logo" src="/icons/gofire.svg" alt="GoFire" />
				</button>
			{/if}
		</div>

		<div class="navbar-right">
			<Avatar onClick={signIn} {img} {toggleGuide} {guide} />
		</div>
	</div>
</header>

<style>
	.navbar {
		width: 100%;
		padding: 1rem 1.5rem;
		position: sticky;
		top: 0;
		z-index: 40;
		background: linear-gradient(to bottom, var(--background) 0%, var(--background) 80%, transparent 100%);
	}

	.navbar-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
	}

	.navbar-left {
		display: flex;
		align-items: center;
	}

	.navbar-right {
		display: flex;
		align-items: center;
	}

	.logo-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.logo-btn:hover {
		opacity: 0.8;
	}

	.logo {
		width: 40px;
		height: 40px;
		border-radius: 10px;
	}

	@media (min-width: 1024px) {
		.navbar {
			padding: 1.5rem 2rem;
		}

		.logo {
			width: 44px;
			height: 44px;
		}
	}
</style>
