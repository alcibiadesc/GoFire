<script lang="ts">
	import Balance from '../components/Balance.svelte';
	import Grid from '../organisms/Grid.svelte';
	import Revenue from '../components/Revenue.svelte';
	import { data } from '../../stores/data.js';
	import { t } from '../../i18n/i18n';

	let balance = 0;
	let revenue = 0;
	let percent = 0;

	data.subscribe((val) => {
		if (val) {
			balance = data.balance();
			revenue = data.balance() - data.revenue() - data.detectNoSavings();
			percent =
				(data.balance() - data.revenue() - data.detectNoSavings()) /
				data.revenue();
		}
	});
</script>

<div class="home-container">
	<div class="dashboard-header">
		<Balance {balance} />
		<Revenue {revenue} {percent} />
	</div>

	<section class="portfolio-section">
		<h2 class="section-title">{$t('CHARTS.PORTFOLIO.TITLE')}</h2>
		<Grid />
	</section>
</div>

<style>
	.home-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.dashboard-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.portfolio-section {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.section-title {
		display: none;
	}

	/* Desktop Layout */
	@media (min-width: 1024px) {
		.home-container {
			gap: 3rem;
		}

		.dashboard-header {
			flex-direction: row;
			align-items: stretch;
			gap: 2rem;
			width: 100%;
		}

		.portfolio-section {
			align-items: flex-start;
		}

		.section-title {
			display: block;
			margin-bottom: 1.5rem;
			color: var(--primary);
		}
	}
</style>
