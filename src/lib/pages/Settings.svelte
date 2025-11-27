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
			<div class="stat-icon-wrap total">
				<img src="/icons/saving.svg" alt="value" class="stat-icon" />
			</div>
			<div class="stat-data">
				<span class="stat-label">Total Value</span>
				<span class="stat-value">{totalFormatted}</span>
			</div>
		</div>
		<div class="stat-card card__background">
			<div class="stat-icon-wrap savings">
				<img src="/icons/chart.svg" alt="savings" class="stat-icon" />
			</div>
			<div class="stat-data">
				<span class="stat-label">Invested</span>
				<span class="stat-value investment">{savingsFormatted}</span>
			</div>
		</div>
		<div class="stat-card card__background">
			<div class="stat-icon-wrap profit" class:positive={isPositive} class:negative={!isPositive}>
				<img src="/icons/{isPositive ? 'up' : 'down'}.svg" alt="profit" class="stat-icon" />
			</div>
			<div class="stat-data">
				<span class="stat-label">Profit</span>
				<div class="stat-value-row">
					<span class="stat-value" class:positive={isPositive} class:negative={!isPositive}>{isPositive ? '+' : ''}{profitFormatted}</span>
					<span class="stat-badge" class:positive={isPositive} class:negative={!isPositive}>{(percent * 100).toFixed(0)}%</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Goal Section -->
	<div class="goal-section card__background">
		<div class="goal-header">
			<div class="goal-title-row">
				<div class="goal-icon-wrap">
					<img src="/icons/highlight.svg" alt="goal" class="goal-icon" />
				</div>
				<div class="goal-title-text">
					<h2>{$t('SETTINGS.GOAL')}</h2>
					<p class="goal-subtitle">Set your financial independence target</p>
				</div>
			</div>
			<div class="goal-input-wrap">
				<Input label="" type="number" bind:value={$goal} />
			</div>
		</div>
		<div class="goal-progress">
			<div class="progress-info">
				<span class="progress-current">{totalFormatted}</span>
				<span class="progress-target">{$t('HOME.OF')} {goalFormatted}</span>
			</div>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {progress}%"></div>
			</div>
			<div class="progress-footer">
				<span class="progress-status">{progress >= 100 ? '🎉 Goal reached!' : `${(100 - progress).toFixed(0)}% remaining`}</span>
				<span class="progress-percent">{progress.toFixed(0)}%</span>
			</div>
		</div>
	</div>

	<!-- Categories Section -->
	<div class="categories-section">
		<div class="categories-header">
			<div class="categories-title">
				<div class="categories-icon-wrap">
					<img src="/icons/tune.svg" alt="categories" class="title-icon" />
				</div>
				<div class="title-text">
					<h2>Investment Categories</h2>
					<p class="title-desc">{totalItems} {totalItems === 1 ? 'category' : 'categories'} • Click to edit values</p>
				</div>
			</div>
			<Tooltip label={$t('SETTINGS.TOOLTIPS.ADD')}>
				<button class="add-btn" on:click={() => data.add($t('SETTINGS.HEADER'))}>
					<img src="/icons/add.svg" alt="add" />
					<span>Add Category</span>
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
		grid-template-columns: 1fr;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	@media (min-width: 480px) {
		.stats-row {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.stat-card {
		padding: 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
	}

	@media (min-width: 480px) {
		.stat-card {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}

	.stat-icon-wrap {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		flex-shrink: 0;
	}

	.stat-icon-wrap.total {
		background: linear-gradient(135deg, rgba(232, 76, 43, 0.2), rgba(232, 76, 43, 0.1));
	}

	.stat-icon-wrap.savings {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1));
	}

	.stat-icon-wrap.profit.positive {
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1));
	}

	.stat-icon-wrap.profit.negative {
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1));
	}

	.stat-icon {
		width: 1.25rem;
		height: 1.25rem;
		filter: brightness(0) invert(0.6);
	}

	.stat-icon-wrap.total .stat-icon {
		filter: var(--filter);
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
		gap: 0.125rem;
	}

	.stat-label {
		font-size: 0.7rem;
		color: var(--tertiary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-weight: 500;
	}

	.stat-value-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.stat-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--primary);
		line-height: 1.2;
	}

	.stat-value.investment {
		color: var(--info);
	}

	.stat-value.positive {
		color: var(--success);
	}

	.stat-value.negative {
		color: var(--danger);
	}

	.stat-badge {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.1);
	}

	.stat-badge.positive {
		color: var(--success);
		background: var(--success-bg);
	}

	.stat-badge.negative {
		color: var(--danger);
		background: var(--danger-bg);
	}

	/* Goal Section */
	.goal-section {
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.goal-header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	.goal-title-row {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.goal-icon-wrap {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(250, 204, 21, 0.1));
		border-radius: 10px;
		flex-shrink: 0;
	}

	.goal-icon {
		width: 1.25rem;
		height: 1.25rem;
		filter: invert(76%) sepia(61%) saturate(1000%) hue-rotate(359deg) brightness(103%) contrast(96%);
	}

	.goal-title-text {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.goal-title-text h2 {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0;
	}

	.goal-subtitle {
		font-size: 0.85rem;
		color: var(--tertiary);
		margin: 0;
	}

	.goal-input-wrap {
		flex: 1;
	}

	.goal-progress {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.progress-info {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.progress-current {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary);
	}

	.progress-target {
		font-size: 0.9rem;
		color: var(--tertiary);
	}

	.progress-bar {
		height: 10px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 5px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--secondary), #f97316);
		border-radius: 5px;
		transition: width 0.5s ease;
	}

	.progress-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.progress-status {
		font-size: 0.85rem;
		color: var(--tertiary);
	}

	.progress-percent {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--secondary);
		background: rgba(232, 76, 43, 0.15);
		padding: 0.25rem 0.625rem;
		border-radius: 6px;
	}

	/* Categories Section */
	.categories-section {
		width: 100%;
	}

	.categories-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
		gap: 1rem;
		flex-wrap: wrap;
	}

	.categories-title {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.categories-icon-wrap {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1));
		border-radius: 10px;
		flex-shrink: 0;
	}

	.title-icon {
		width: 1.25rem;
		height: 1.25rem;
		filter: invert(45%) sepia(93%) saturate(1500%) hue-rotate(240deg) brightness(90%) contrast(95%);
	}

	.title-text {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.title-text h2 {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0;
	}

	.title-desc {
		font-size: 0.85rem;
		color: var(--tertiary);
		margin: 0;
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
