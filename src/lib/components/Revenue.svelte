<script lang="ts">
	import { formatPercent } from '../../scripts/scripts.js';
	import { t } from '../../i18n/i18n';
	import { currency, formatNum } from '../../i18n/currency';

	export let revenue: number = 0;
	export let percent: number = 0;

	let revenueFormatted = '';

	$: currency.subscribe(() => {
		revenueFormatted = formatNum(revenue);
	});

	$: isPositive = revenue >= 0;
	$: displayPercent = formatPercent(isNaN(percent) ? 0 : percent);
</script>

<div class="revenue-card card__background">
	<div class="revenue-header">
		<img src="/icons/chart.svg" alt="profit" class="revenue-icon" />
		<span class="revenue-label">{$t('HOME.PROFIT')}</span>
	</div>

	<div class="revenue-content">
		<span class="revenue-amount" class:positive={isPositive} class:negative={!isPositive}>
			{revenueFormatted}
		</span>
		<span class="revenue-percent" class:positive={isPositive} class:negative={!isPositive}>
			{displayPercent}
		</span>
	</div>

	<div class="revenue-footer">
		<span class="profitability-label">{$t('HOME.PROFITABILITY')}</span>
		<div class="progress-bar">
			<div
				class="progress-fill"
				class:positive={isPositive}
				style="width: {Math.min(Math.abs(percent) * 100, 100)}%"
			></div>
		</div>
	</div>
</div>

<style>
	.revenue-card {
		padding: 1.5rem;
		width: 92%;
		max-width: 400px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.revenue-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.revenue-icon {
		width: 1.25rem;
		height: 1.25rem;
		filter: brightness(0) invert(1);
		opacity: 0.6;
	}

	.revenue-label {
		color: var(--tertiary);
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.revenue-content {
		display: flex;
		align-items: baseline;
		gap: 1rem;
	}

	.revenue-amount {
		font-size: 2rem;
		font-weight: 700;
		color: var(--primary);
	}

	.revenue-percent {
		font-size: 1.125rem;
		font-weight: 600;
		padding: 0.25rem 0.5rem;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.1);
	}

	.positive {
		color: #10b981;
	}

	.negative {
		color: #ef4444;
	}

	.revenue-footer {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.profitability-label {
		color: var(--tertiary);
		font-size: 0.75rem;
	}

	.progress-bar {
		height: 6px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--secondary);
		border-radius: 3px;
		transition: width 0.3s ease;
	}

	.progress-fill.positive {
		background: #10b981;
	}

	/* Desktop */
	@media (min-width: 1024px) {
		.revenue-card {
			flex: 0 0 320px;
			max-width: 320px;
			padding: 2rem;
		}

		.revenue-amount {
			font-size: 2.25rem;
		}
	}
</style>
