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
	$: remaining = Math.max(0, $goal - totalValue);

	let totalFormatted = '';
	let goalFormatted = '';
	let savingsFormatted = '';
	let profitFormatted = '';
	let remainingFormatted = '';

	$: currency.subscribe(() => {
		totalFormatted = formatNum(totalValue);
		goalFormatted = formatNum($goal);
		savingsFormatted = formatNum(totalSavings);
		profitFormatted = formatNum(profit);
		remainingFormatted = formatNum(remaining);
	});
</script>

<div class="portfolio-page">
	<!-- Page Header -->
	<header class="page-header">
		<div class="header-content">
			<h1>{$t('SETTINGS.TITLE')}</h1>
			<p class="header-subtitle">{$t('SETTINGS.SUBTITLE')}</p>
		</div>
	</header>

	<!-- Stats Cards -->
	<div class="stats-row">
		<div class="stat-card card__background main">
			<div class="stat-icon-wrap total">
				<img src="/icons/saving.svg" alt="portfolio" class="stat-icon" />
			</div>
			<div class="stat-data">
				<span class="stat-label">Total Portfolio</span>
				<span class="stat-value">{totalFormatted}</span>
			</div>
		</div>
		<div class="stat-card card__background">
			<div class="stat-icon-wrap investment">
				<img src="/icons/chart.svg" alt="invested" class="stat-icon" />
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
				<span class="stat-label">
					Profit
					<span class="profit-badge" class:positive={isPositive} class:negative={!isPositive}>
						{(percent * 100).toFixed(1)}%
					</span>
				</span>
				<span class="stat-value" class:positive={isPositive} class:negative={!isPositive}>
					{isPositive ? '+' : ''}{profitFormatted}
				</span>
			</div>
		</div>
	</div>

	<!-- Goal Section -->
	<div class="goal-section card__background">
		<div class="goal-content">
			<div class="goal-ring">
				<svg viewBox="0 0 120 120" class="progress-ring">
					<circle cx="60" cy="60" r="52" class="progress-ring-bg" />
					<circle
						cx="60"
						cy="60"
						r="52"
						class="progress-ring-fill"
						style="stroke-dasharray: {326.7 * progress / 100} 326.7"
					/>
				</svg>
				<div class="goal-ring-content">
					<span class="goal-percent">{progress.toFixed(0)}%</span>
					<span class="goal-label">achieved</span>
				</div>
			</div>
			<div class="goal-details">
				<div class="goal-header">
					<h2>{$t('SETTINGS.GOAL')}</h2>
					<p class="goal-subtitle">Track your financial independence journey</p>
				</div>
				<div class="goal-stats">
					<div class="goal-stat">
						<span class="goal-stat-label">Target</span>
						<span class="goal-stat-value">{goalFormatted}</span>
					</div>
					<div class="goal-stat">
						<span class="goal-stat-label">Current</span>
						<span class="goal-stat-value current">{totalFormatted}</span>
					</div>
					<div class="goal-stat">
						<span class="goal-stat-label">Remaining</span>
						<span class="goal-stat-value remaining">{remainingFormatted}</span>
					</div>
				</div>
				<div class="goal-input-section">
					<Input label="Set your goal" type="number" bind:value={$goal} />
				</div>
			</div>
		</div>
	</div>

	<!-- Categories Section -->
	<div class="categories-section">
		<div class="categories-header">
			<div class="categories-title">
				<img src="/icons/saving.svg" alt="categories" class="section-icon" />
				<div class="title-text">
					<h2>Investment Categories</h2>
					<span class="categories-count">{totalItems} {totalItems === 1 ? 'category' : 'categories'}</span>
				</div>
			</div>
			<Tooltip label={$t('SETTINGS.TOOLTIPS.ADD')}>
				<button class="add-btn" on:click={() => data.add($t('SETTINGS.HEADER'))}>
					<img src="/icons/add.svg" alt="add" />
					<span>Add Category</span>
				</button>
			</Tooltip>
		</div>
		<Grid edit={true} />
	</div>
</div>

<style>
	.portfolio-page {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* Page Header */
	.page-header {
		margin-bottom: 0.5rem;
	}

	.header-content h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0 0 0.25rem 0;
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
	}

	.stat-card {
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 0.875rem;
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

	.stat-icon-wrap.investment {
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

	.stat-icon-wrap.investment .stat-icon {
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
		min-width: 0;
	}

	.stat-label {
		font-size: 0.7rem;
		color: var(--tertiary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-weight: 500;
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

	.stat-card.main .stat-value {
		color: var(--secondary);
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

	.profit-badge {
		font-size: 0.65rem;
		font-weight: 600;
		padding: 0.125rem 0.375rem;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.1);
	}

	.profit-badge.positive {
		color: var(--success);
		background: var(--success-bg);
	}

	.profit-badge.negative {
		color: var(--danger);
		background: var(--danger-bg);
	}

	/* Goal Section */
	.goal-section {
		padding: 1.25rem;
	}

	.goal-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.goal-ring {
		position: relative;
		width: 140px;
		height: 140px;
		flex-shrink: 0;
	}

	.progress-ring {
		transform: rotate(-90deg);
		width: 100%;
		height: 100%;
	}

	.progress-ring-bg {
		fill: none;
		stroke: rgba(255, 255, 255, 0.1);
		stroke-width: 8;
	}

	.progress-ring-fill {
		fill: none;
		stroke: var(--secondary);
		stroke-width: 8;
		stroke-linecap: round;
		transition: stroke-dasharray 0.5s ease;
	}

	.goal-ring-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.goal-percent {
		display: block;
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--primary);
		line-height: 1;
	}

	.goal-label {
		font-size: 0.65rem;
		color: var(--tertiary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.goal-details {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.goal-header {
		text-align: center;
	}

	.goal-header h2 {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0 0 0.25rem 0;
	}

	.goal-subtitle {
		font-size: 0.8rem;
		color: var(--tertiary);
		margin: 0;
	}

	.goal-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	.goal-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 0.75rem;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 10px;
		border: 1px solid var(--border-color);
	}

	.goal-stat-label {
		font-size: 0.65rem;
		color: var(--tertiary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-weight: 500;
	}

	.goal-stat-value {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--primary);
	}

	.goal-stat-value.current {
		color: var(--secondary);
	}

	.goal-stat-value.remaining {
		color: var(--info);
	}

	.goal-input-section {
		max-width: 300px;
		margin: 0 auto;
		width: 100%;
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
		gap: 1rem;
		flex-wrap: wrap;
	}

	.categories-title {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.section-icon {
		width: 1.5rem;
		height: 1.5rem;
		filter: var(--filter);
	}

	.title-text {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.title-text h2 {
		font-size: 1rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0;
		line-height: 1.3;
	}

	.categories-count {
		font-size: 0.7rem;
		color: var(--tertiary);
	}

	.add-btn {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.625rem 1rem;
		background: var(--secondary);
		border: none;
		border-radius: 10px;
		color: white;
		font-weight: 600;
		font-size: 0.8rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.add-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(232, 76, 43, 0.3);
	}

	.add-btn img {
		width: 0.875rem;
		height: 0.875rem;
		filter: brightness(0) invert(1);
	}

	/* Tablet */
	@media (min-width: 480px) {
		.stats-row {
			grid-template-columns: repeat(3, 1fr);
		}

		.stat-card {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}

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

		.goal-section {
			padding: 1.5rem;
		}

		.goal-content {
			flex-direction: row;
			align-items: center;
			gap: 2rem;
		}

		.goal-ring {
			width: 160px;
			height: 160px;
		}

		.goal-percent {
			font-size: 2rem;
		}

		.goal-details {
			flex: 1;
		}

		.goal-header {
			text-align: left;
		}

		.goal-stats {
			gap: 1rem;
		}

		.goal-stat {
			align-items: flex-start;
			padding: 1rem;
		}

		.goal-stat-value {
			font-size: 1.125rem;
		}

		.goal-input-section {
			max-width: 100%;
			margin: 0;
		}

		.title-text h2 {
			font-size: 1.125rem;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		.portfolio-page {
			gap: 2rem;
		}

		.page-header {
			margin-bottom: 0;
		}

		.header-content h1 {
			font-size: 1.75rem;
		}

		.stats-row {
			margin-bottom: 0;
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
		}

		.goal-content {
			gap: 3rem;
		}

		.goal-ring {
			width: 180px;
			height: 180px;
		}

		.goal-percent {
			font-size: 2.25rem;
		}

		.goal-header h2 {
			font-size: 1.25rem;
		}

		.goal-stat-value {
			font-size: 1.25rem;
		}

		.categories-header {
			margin-bottom: 1.5rem;
		}

		.section-icon {
			width: 1.75rem;
			height: 1.75rem;
		}

		.title-text h2 {
			font-size: 1.25rem;
		}
	}
</style>
