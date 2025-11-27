<script lang="ts">
	import Button from '../atoms/Button.svelte';
	import Input from '../atoms/Input.svelte';
	import Tooltip from '../atoms/Tooltip.svelte';
	import Grid from '../organisms/Grid.svelte';
	import { data } from '../../stores/data.js';
	import { goal } from '../../stores/goal.js';
	import { t } from '../../i18n/i18n';
	import { currency, formatNum } from '../../i18n/currency';

	let totalValue = 0;
	let totalSavings = 0;
	let profit = 0;
	let percent = 0;

	data.subscribe((val) => {
		if (val) {
			totalValue = data.balance();
			totalSavings = data.revenue();
			profit = data.balance() - data.revenue() - data.detectNoSavings();
			percent = data.revenue() > 0 ? profit / data.revenue() : 0;
		}
	});

	$: totalItems = $data?.length || 0;
	$: progress = $goal > 0 ? Math.min((totalValue / $goal) * 100, 100) : 0;
	$: isPositive = profit >= 0;

	let totalFormatted = '';
	let goalFormatted = '';
	let savingsFormatted = '';
	let profitFormatted = '';

	$: currency.subscribe(() => {
		totalFormatted = formatNum(totalValue);
		goalFormatted = formatNum($goal);
		savingsFormatted = formatNum(totalSavings);
		profitFormatted = formatNum(profit);
	});
</script>

<div class="portfolio-page">
	<header class="page-header">
		<div class="header-content">
			<h1>{$t('SETTINGS.TITLE')}</h1>
			<p class="header-subtitle">{$t('SETTINGS.SUBTITLE')}</p>
		</div>
	</header>

	<!-- Stats Summary -->
	<div class="stats-row">
		<div class="stat-card card__background">
			<div class="stat-icon-wrap">
				<img src="/icons/saving.svg" alt="value" class="stat-icon" />
			</div>
			<div class="stat-data">
				<span class="stat-value">{totalFormatted}</span>
				<span class="stat-label">Total Value</span>
			</div>
		</div>
		<div class="stat-card card__background">
			<div class="stat-icon-wrap savings">
				<img src="/icons/chart.svg" alt="savings" class="stat-icon" />
			</div>
			<div class="stat-data">
				<span class="stat-value">{savingsFormatted}</span>
				<span class="stat-label">Invested</span>
			</div>
		</div>
		<div class="stat-card card__background" class:positive={isPositive} class:negative={!isPositive}>
			<div class="stat-icon-wrap profit" class:positive={isPositive} class:negative={!isPositive}>
				<img src="/icons/up.svg" alt="profit" class="stat-icon" />
			</div>
			<div class="stat-data">
				<div class="stat-value-row">
					<span class="stat-value" class:positive={isPositive} class:negative={!isPositive}>{profitFormatted}</span>
					<span class="stat-percent" class:positive={isPositive} class:negative={!isPositive}>{(percent * 100).toFixed(0)}%</span>
				</div>
				<span class="stat-label">Profit</span>
			</div>
		</div>
	</div>

	<!-- Goal Section -->
	<div class="goal-section card__background">
		<div class="goal-header">
			<div class="goal-title-row">
				<img src="/icons/highlight.svg" alt="goal" class="goal-icon" />
				<div class="goal-title-text">
					<h2>{$t('SETTINGS.GOAL')}</h2>
					<span class="goal-subtitle">{$t('HOME.GOAL')}</span>
				</div>
			</div>
			<div class="goal-input-wrap">
				<Input label="" type="number" bind:value={$goal} />
			</div>
		</div>
		<div class="goal-progress">
			<div class="progress-bar">
				<div class="progress-fill" style="width: {progress}%"></div>
			</div>
			<div class="progress-labels">
				<span class="progress-current">{totalFormatted}</span>
				<span class="progress-percent">{progress.toFixed(0)}%</span>
				<span class="progress-goal">{goalFormatted}</span>
			</div>
		</div>
	</div>

	<!-- Categories Section -->
	<div class="categories-section">
		<div class="categories-header">
			<div class="categories-title">
				<img src="/icons/tune.svg" alt="categories" class="title-icon" />
				<div class="title-text">
					<h2>{$t('CHARTS.PORTFOLIO.TITLE')}</h2>
					<span class="title-count">{totalItems} categories</span>
				</div>
			</div>
			<Tooltip label={$t('SETTINGS.TOOLTIPS.ADD')}>
				<button class="add-btn" on:click={() => data.add($t('SETTINGS.HEADER'))}>
					<img src="/icons/add.svg" alt="add" />
					<span>Add</span>
				</button>
			</Tooltip>
		</div>
		<div class="categories-content">
			<Grid edit={true} />
		</div>
	</div>
</div>

<style>
	.portfolio-page {
		width: 100%;
	}

	/* Header */
	.page-header {
		margin-bottom: 1.5rem;
	}

	.header-content h1 {
		margin-bottom: 0.25rem;
	}

	.header-subtitle {
		color: var(--tertiary);
		font-size: 0.9rem;
		margin: 0;
	}

	/* Stats Row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.stat-card {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.stat-icon-wrap {
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 8px;
	}

	.stat-icon-wrap.savings {
		background: rgba(59, 130, 246, 0.15);
	}

	.stat-icon-wrap.profit.positive {
		background: rgba(16, 185, 129, 0.15);
	}

	.stat-icon-wrap.profit.negative {
		background: rgba(239, 68, 68, 0.15);
	}

	.stat-icon {
		width: 1rem;
		height: 1rem;
		filter: brightness(0) invert(0.6);
	}

	.stat-icon-wrap.savings .stat-icon {
		filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(207deg) brightness(100%) contrast(95%);
	}

	.stat-icon-wrap.profit.positive .stat-icon {
		filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(118deg) brightness(104%) contrast(86%);
	}

	.stat-icon-wrap.profit.negative .stat-icon {
		filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(336deg) brightness(95%) contrast(95%);
	}

	.stat-data {
		display: flex;
		flex-direction: column;
	}

	.stat-value-row {
		display: flex;
		align-items: baseline;
		gap: 0.375rem;
	}

	.stat-value {
		font-size: 1rem;
		font-weight: 700;
		color: var(--primary);
	}

	.stat-percent {
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--tertiary);
	}

	.stat-percent.positive {
		color: #10b981;
	}

	.stat-percent.negative {
		color: #ef4444;
	}

	.stat-value.positive {
		color: #10b981;
	}

	.stat-value.negative {
		color: #ef4444;
	}

	.stat-label {
		font-size: 0.65rem;
		color: var(--tertiary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Goal Section */
	.goal-section {
		padding: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.goal-header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.goal-title-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.goal-icon {
		width: 1.5rem;
		height: 1.5rem;
		filter: var(--filter);
	}

	.goal-title-text h2 {
		font-size: 1rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0;
	}

	.goal-subtitle {
		font-size: 0.75rem;
		color: var(--tertiary);
	}

	.goal-input-wrap {
		flex: 1;
	}

	.goal-progress {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.progress-bar {
		height: 8px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--secondary);
		border-radius: 4px;
		transition: width 0.3s ease;
	}

	.progress-labels {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.progress-current {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--primary);
	}

	.progress-percent {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--secondary);
		background: rgba(232, 76, 43, 0.15);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.progress-goal {
		font-size: 0.85rem;
		color: var(--tertiary);
	}

	/* Categories Section */
	.categories-section {
		width: 100%;
	}

	.categories-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--border-color);
	}

	.categories-title {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.title-icon {
		width: 1.5rem;
		height: 1.5rem;
		filter: brightness(0) invert(0.6);
	}

	.title-text h2 {
		font-size: 1rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0;
	}

	.title-count {
		font-size: 0.75rem;
		color: var(--tertiary);
	}

	.add-btn {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.5rem 1rem;
		background: var(--secondary);
		border: none;
		border-radius: 8px;
		color: white;
		font-weight: 600;
		font-size: 0.85rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.add-btn:hover {
		opacity: 0.9;
	}

	.add-btn img {
		width: 1rem;
		height: 1rem;
		filter: brightness(0) invert(1);
	}

	.categories-content {
		width: 100%;
	}

	/* Tablet */
	@media (min-width: 768px) {
		.stats-row {
			gap: 1rem;
		}

		.stat-card {
			padding: 1.25rem;
			flex-direction: row;
			align-items: center;
			gap: 1rem;
		}

		.stat-icon-wrap {
			width: 2.5rem;
			height: 2.5rem;
		}

		.stat-icon {
			width: 1.25rem;
			height: 1.25rem;
		}

		.stat-value {
			font-size: 1.25rem;
		}

		.goal-section {
			padding: 1.5rem;
		}

		.goal-header {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.goal-input-wrap {
			max-width: 200px;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		.page-header {
			margin-bottom: 2rem;
		}

		.stats-row {
			margin-bottom: 2rem;
		}

		.stat-card {
			padding: 1.5rem;
		}

		.stat-icon-wrap {
			width: 3rem;
			height: 3rem;
		}

		.stat-icon {
			width: 1.5rem;
			height: 1.5rem;
		}

		.stat-value {
			font-size: 1.5rem;
		}

		.stat-label {
			font-size: 0.75rem;
		}

		.goal-section {
			padding: 2rem;
			margin-bottom: 2rem;
		}

		.goal-title-text h2 {
			font-size: 1.125rem;
		}

		.goal-input-wrap {
			max-width: 250px;
		}

		.progress-bar {
			height: 10px;
		}

		.categories-header {
			margin-bottom: 1.5rem;
			padding-bottom: 1rem;
		}

		.title-text h2 {
			font-size: 1.25rem;
		}

		.add-btn {
			padding: 0.625rem 1.25rem;
			font-size: 0.9rem;
		}
	}

	@media (min-width: 1280px) {
		.stat-card {
			padding: 1.75rem;
		}

		.stat-value {
			font-size: 1.75rem;
		}

		.goal-section {
			padding: 2.5rem;
		}

		.title-text h2 {
			font-size: 1.5rem;
		}
	}
</style>
