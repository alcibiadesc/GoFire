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
		<div class="section-header">
			<div class="section-icon-wrap">
				<img src="/icons/chart.svg" alt="portfolio" class="section-icon" />
			</div>
			<div class="section-text">
				<h2 class="section-title">{$t('CHARTS.PORTFOLIO.TITLE')}</h2>
				<p class="section-desc">Your investment categories overview</p>
			</div>
		</div>
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

	.section-header {
		display: none;
	}

	.section-icon-wrap {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(232, 76, 43, 0.2), rgba(232, 76, 43, 0.1));
		border-radius: 10px;
		flex-shrink: 0;
	}

	.section-icon {
		width: 1.25rem;
		height: 1.25rem;
		filter: var(--filter);
	}

	.section-text {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.section-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0;
	}

	.section-desc {
		font-size: 0.9rem;
		color: var(--tertiary);
		margin: 0;
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

		.section-header {
			display: flex;
			align-items: flex-start;
			gap: 1rem;
			margin-bottom: 1.5rem;
			padding-bottom: 1rem;
			border-bottom: 1px solid var(--border-color);
			width: 100%;
		}
	}
</style>
