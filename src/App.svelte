<script lang="ts">
	import { onMount } from 'svelte';
	import Home from './lib/pages/Home.svelte';
	import User from './lib/pages/User.svelte';
	import Menu from './lib/components/Menu.svelte';
	import Settings from './lib/pages/Settings.svelte';
	import Navbar from './lib/components/Navbar.svelte';
	import Chart from './lib/pages/Chart.svelte';
	import Sidebar from './lib/components/Sidebar.svelte';
	import { landing } from './stores/landing';
	import Landing from './lib/pages/Landing.svelte';
	import Guide from './lib/components/Guide.svelte';

	type PageKey = 'home' | 'tune' | 'saving' | 'chart';

	const pages: Record<PageKey, typeof Home> = {
		home: Home,
		tune: User,
		saving: Settings,
		chart: Chart,
	};

	let current: PageKey = 'home';
	let guide = false;
	let isDesktop = false;

	const checkScreenSize = () => {
		isDesktop = window.innerWidth >= 1024;
	};

	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	});

	const toggleGuide = () => {
		guide = !guide;
		$landing = false;
	};

	const quitGuide = () => {
		guide = false;
	};

	const navigate = (page: string) => {
		current = page as PageKey;
	};

	$: if (!$landing) {
		current = 'home';
	}

	$: page = pages[current];
</script>

<div class="app-container" class:desktop={isDesktop}>
	{#if isDesktop && !$landing && !guide}
		<Sidebar {current} onNavigate={navigate} />
	{/if}

	<main class="main-content" class:with-sidebar={isDesktop && !$landing && !guide}>
		{#if !isDesktop || $landing || guide}
			<Navbar toggleGuide={toggleGuide} {guide} {quitGuide} landing={$landing} />
		{/if}

		<div class="page-container">
			{#if guide}
				<Guide />
			{:else if $landing}
				<Landing toggleGuide={toggleGuide} />
			{:else}
				<svelte:component this={page} />
			{/if}
		</div>

		{#if !isDesktop && !$landing && !guide}
			<Menu {current} selectedBtn={navigate} />
		{/if}
	</main>
</div>

<style>
	.app-container {
		min-height: 100vh;
		display: flex;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
		transition: margin-left 0.3s ease;
	}

	.main-content.with-sidebar {
		margin-left: 280px;
	}

	.page-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		padding-bottom: 6rem;
	}

	.desktop .page-container {
		padding: 2rem 3rem;
		padding-bottom: 2rem;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
	}

	@media (min-width: 1024px) {
		.page-container {
			align-items: flex-start;
		}
	}
</style>
