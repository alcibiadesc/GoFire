<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ChartDoughnut from '../atoms/ChartDoughnut.svelte';
	import ChartLine from '../atoms/ChartLine.svelte';
	import { data } from '../../stores/data.js';
	import { theme } from '../../stores/theme.js';
	import { round } from '../../scripts/scripts.js';
	import { t } from '../../i18n/i18n';
	import { formatNum } from '../../i18n/currency';

	let revenue = 0;
	let saving = 0;
	let lineChartData = {
		labels: [],
		datasets: [
			{
				label: $t('CHARTS.LINE.SAVINGS_PROGRESSION'),
				data: [],
				borderColor: '#3B82F6',
				backgroundColor: 'rgba(59, 130, 246, 0.05)',
				fill: true,
				tension: 0.4,
				pointBackgroundColor: '#3B82F6',
				pointBorderColor: '#fff',
				pointBorderWidth: 2,
				pointRadius: 4,
			},
		],
	};

	let viewMode = 'grouped';
	let originalSavingsData: any[] = [];
	let availableCategories: string[] = [];
	let selectedCategories = new Set<string>();
	let selectedPeriod = 'ALL';
	let hasOriginalData = false;

	const viewModes = [
		{ key: 'grouped', label: 'CHARTS.LINE.VIEW_GROUPED', icon: 'chart' },
		{ key: 'individual', label: 'CHARTS.LINE.VIEW_INDIVIDUAL', icon: 'up' },
		{ key: 'current-month', label: 'CHARTS.LINE.VIEW_CURRENT_MONTH', icon: 'history' },
	];

	let themeColors = {
		primary: '#FFFFFF',
		secondary: '#7e858d',
		background: '#2a2c31',
		cardBackground: 'linear-gradient(to bottom, #3b4044, #2f3138)',
		accent: '#e84c2b',
	};

	$: {
		const isDark = $theme === 'dark';
		themeColors = {
			primary: isDark ? '#FFFFFF' : '#12151a',
			secondary: isDark ? '#7e858d' : '#7d8ca2',
			background: isDark ? '#2a2c31' : '#e1eaf9',
			cardBackground: isDark
				? 'linear-gradient(to bottom, #3b4044, #2f3138)'
				: 'linear-gradient(to bottom, #f0faff, #cdd9ec)',
			accent: isDark ? '#e84c2b' : '#238EE4',
		};
	}

	function formatDateForDisplay(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
		});
	}

	function groupDataByPeriod(allSavings: any[]) {
		const grouped: Record<string, any> = {};

		allSavings.forEach((saving) => {
			const date = new Date(saving.date);
			const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

			if (!grouped[monthKey]) {
				grouped[monthKey] = {
					date: monthKey,
					amount: 0,
					displayDate: formatDateForDisplay(saving.date),
				};
			}
			grouped[monthKey].amount += saving.amount;
		});

		return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
	}

	function processTemporalSavings(dataArray: any[]) {
		if (!dataArray || dataArray.length === 0) return { labels: [], datasets: [] };

		let allSavings: any[] = [];
		let categories = new Set<string>();

		dataArray.forEach((category) => {
			const categoryName = category.title || category.name || '';
			if (categoryName.trim() !== '') {
				categories.add(categoryName);
			}

			if (category.saving && category.saving.length > 0) {
				category.saving.forEach((savingEntry: any) => {
					if (savingEntry.today && savingEntry.amount) {
						allSavings.push({
							date: savingEntry.today,
							amount: parseFloat(savingEntry.amount) || 0,
							category: categoryName,
						});
					}
				});
			}
		});

		availableCategories = Array.from(categories).sort();

		if (selectedCategories.size === 0 && availableCategories.length > 0) {
			selectedCategories = new Set(availableCategories);
		}

		if (allSavings.length === 0) return { labels: [], datasets: [] };

		allSavings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

		originalSavingsData = [...allSavings];
		hasOriginalData = true;

		return processDataBasedOnSettings(allSavings);
	}

	function processDataBasedOnSettings(allSavings: any[]) {
		let processedSavings = [...allSavings];

		if (selectedCategories.size > 0 && selectedCategories.size < availableCategories.length) {
			processedSavings = processedSavings.filter((saving) =>
				selectedCategories.has(saving.category)
			);
		}

		if (selectedPeriod !== 'ALL') {
			const periodConfig: Record<string, number> = {
				'1M': 1,
				'3M': 3,
				'6M': 6,
				'1Y': 12,
				'2Y': 24,
				'5Y': 60,
			};

			if (periodConfig[selectedPeriod]) {
				const now = new Date();
				const cutoffDate = new Date(
					now.getFullYear(),
					now.getMonth() - periodConfig[selectedPeriod],
					now.getDate()
				);

				processedSavings = processedSavings.filter((saving) => {
					const savingDate = new Date(saving.date);
					return savingDate >= cutoffDate;
				});
			}
		}

		if (viewMode === 'current-month') {
			const now = new Date();
			const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
			const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

			processedSavings = processedSavings.filter((saving) => {
				const savingDate = new Date(saving.date);
				return savingDate >= currentMonth && savingDate < nextMonth;
			});
		}

		let processedData = processedSavings;

		if (viewMode === 'grouped' && processedSavings.length > 0) {
			processedData = groupDataByPeriod(processedSavings);
		}

		let cumulativeAmount = 0;
		let labels: string[] = [];
		let cumulativeData: number[] = [];
		let changeData: any[] = [];

		processedData.forEach((saving, index) => {
			const previousAmount = cumulativeAmount;
			cumulativeAmount += saving.amount;

			const change = index > 0 ? saving.amount : 0;
			const changePercent =
				index > 0 && previousAmount > 0 ? (change / previousAmount) * 100 : 0;

			let label;
			if (viewMode === 'individual' || viewMode === 'current-month') {
				const date = new Date(saving.date);
				label = date.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				});
				if (saving.category && saving.category.trim() !== '') {
					label += ` (${saving.category})`;
				}
			} else {
				if (saving.displayDate) {
					label = saving.displayDate;
				} else {
					label = new Date(saving.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
					});
				}
			}

			labels.push(label);
			const roundedAmount = round(cumulativeAmount, { returnZero: true });
			cumulativeData.push(roundedAmount);
			changeData.push({
				amount: roundedAmount,
				change: round(change, { returnZero: true }),
				changePercent: changePercent.toFixed(2),
				isIncrease: change >= 0,
				entryAmount: round(saving.amount, { returnZero: true }),
			});
		});

		const isDark = $theme === 'dark';

		return {
			labels,
			datasets: [
				{
					label:
						viewMode === 'individual' || viewMode === 'current-month'
							? $t('CHARTS.LINE.INDIVIDUAL_ENTRIES') || 'Individual Entries'
							: $t('CHARTS.LINE.SAVINGS_PROGRESSION'),
					data: cumulativeData,
					borderColor: isDark ? '#3B82F6' : '#238EE4',
					backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(35, 142, 228, 0.1)',
					fill: true,
					tension: viewMode === 'individual' || viewMode === 'current-month' ? 0.1 : 0.3,
					pointBackgroundColor: isDark ? '#3B82F6' : '#238EE4',
					pointBorderColor: themeColors.primary,
					pointBorderWidth: 2,
					pointRadius: viewMode === 'individual' || viewMode === 'current-month' ? 5 : 4,
					pointHoverRadius: 6,
					changeData: changeData,
				},
			],
		};
	}

	function toggleCategory(category: string) {
		if (selectedCategories.has(category)) {
			selectedCategories.delete(category);
		} else {
			selectedCategories.add(category);
		}
		selectedCategories = new Set(selectedCategories);
		handleDataUpdate();
	}

	function selectAllCategories() {
		selectedCategories = new Set(availableCategories);
		handleDataUpdate();
	}

	function deselectAllCategories() {
		selectedCategories = new Set();
		handleDataUpdate();
	}

	function handleDataUpdate() {
		if (originalSavingsData.length > 0) {
			lineChartData = processDataBasedOnSettings(originalSavingsData);
		}
	}

	function handleViewModeChange() {
		handleDataUpdate();
	}

	function handlePeriodChange(event: CustomEvent) {
		selectedPeriod = event.detail.period;
		handleDataUpdate();
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('period-change', handlePeriodChange as EventListener);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('period-change', handlePeriodChange as EventListener);
		}
	});

	$: if (viewMode !== undefined) {
		handleViewModeChange();
	}

	data.subscribe((val) => {
		if (val && val.length > 0) {
			revenue = data.balance() - data.revenue() - data.detectNoSavings();
			saving = data.balance() - revenue;
			lineChartData = processTemporalSavings(val);
		}
	});

	$: isDark = $theme === 'dark';
	$: isPositive = revenue >= 0;
	$: total = saving + revenue;
</script>

<div class="chart-page">
	<header class="page-header">
		<div class="header-content">
			<h1>{$t('CHARTS.TITLE')}</h1>
			<p class="header-subtitle">{$t('CHARTS.SUBTITLE')}</p>
		</div>
	</header>

	<!-- Stats Row -->
	<div class="stats-row">
		<div class="stat-card card__background">
			<div class="stat-icon-wrap">
				<img src="/icons/saving.svg" alt="total" class="stat-icon" />
			</div>
			<div class="stat-data">
				<span class="stat-value">{formatNum(round(total, { returnZero: true }))}</span>
				<span class="stat-label">Total</span>
			</div>
		</div>
		<div class="stat-card card__background">
			<div class="stat-icon-wrap investment">
				<img src="/icons/chart.svg" alt="investment" class="stat-icon" />
			</div>
			<div class="stat-data">
				<span class="stat-value">{formatNum(round(saving, { returnZero: true }))}</span>
				<span class="stat-label">{$t('CHARTS.PORTFOLIO.TOTAL_INVESTMENT')}</span>
			</div>
		</div>
		<div class="stat-card card__background" class:positive={isPositive} class:negative={!isPositive}>
			<div class="stat-icon-wrap profit" class:positive={isPositive} class:negative={!isPositive}>
				<img src="/icons/up.svg" alt="profit" class="stat-icon" />
			</div>
			<div class="stat-data">
				<span class="stat-value" class:positive={isPositive} class:negative={!isPositive}>
					{formatNum(round(revenue, { returnZero: true }))}
				</span>
				<span class="stat-label">{$t('CHARTS.PORTFOLIO.TOTAL_REVENUE')}</span>
			</div>
		</div>
	</div>

	<!-- Portfolio Distribution -->
	<div class="portfolio-section card__background">
		<div class="portfolio-header">
			<div class="portfolio-title">
				<img src="/icons/chart.svg" alt="portfolio" class="section-icon" />
				<div class="title-text">
					<h2>{$t('CHARTS.PORTFOLIO.TITLE')}</h2>
					<span class="title-subtitle">{$t('CHARTS.PORTFOLIO.SUBTITLE')}</span>
				</div>
			</div>
		</div>
		<div class="portfolio-content">
			<div class="doughnut-wrapper">
				<ChartDoughnut
					metrics={[
						round(saving, { returnZero: true }),
						round(revenue, { returnZero: true }),
					]}
				/>
			</div>
			<div class="portfolio-legend">
				<div class="legend-item">
					<div class="legend-dot investment"></div>
					<span class="legend-label">{$t('CHARTS.PORTFOLIO.TOTAL_INVESTMENT')}</span>
					<span class="legend-value">{formatNum(round(saving, { returnZero: true }))}</span>
				</div>
				<div class="legend-item">
					<div class="legend-dot" class:positive={isPositive} class:negative={!isPositive}></div>
					<span class="legend-label">{$t('CHARTS.PORTFOLIO.TOTAL_REVENUE')}</span>
					<span class="legend-value" class:positive={isPositive} class:negative={!isPositive}>
						{formatNum(round(revenue, { returnZero: true }))}
					</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Timeline Section -->
	{#if hasOriginalData}
		<div class="timeline-section card__background">
			<div class="timeline-header">
				<div class="timeline-title">
					<img src="/icons/history.svg" alt="timeline" class="section-icon" />
					<div class="title-text">
						<h2>{$t('CHARTS.LINE.CARD_TITLE')}</h2>
						<span class="title-subtitle">{$t('CHARTS.LINE.CARD_SUBTITLE')}</span>
					</div>
				</div>
				<div class="view-selector">
					{#each viewModes as mode}
						<button
							class="view-btn"
							class:active={viewMode === mode.key}
							on:click={() => (viewMode = mode.key)}
							title={$t(mode.label)}
						>
							<img src="/icons/{mode.icon}.svg" alt={mode.key} class="view-icon" />
							<span class="view-label">{$t(mode.label)}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class="chart-container">
				{#if lineChartData.labels && lineChartData.labels.length > 0}
					<ChartLine data={lineChartData} {selectedPeriod} />
				{:else}
					<div class="no-data">
						<img src="/icons/chart.svg" alt="No data" class="no-data-icon" />
						<p>{$t('CHARTS.PORTFOLIO.NO_TIMELINE_TEXT')}</p>
					</div>
				{/if}
			</div>

			{#if availableCategories.length > 1}
				<div class="filter-section">
					<div class="filter-header">
						<span class="filter-title">{$t('CHARTS.LINE.FILTER_CATEGORIES')}</span>
						<div class="filter-actions">
							<button class="filter-btn" on:click={selectAllCategories}>
								{$t('CHARTS.LINE.SELECT_ALL')}
							</button>
							<span class="filter-divider">|</span>
							<button class="filter-btn" on:click={deselectAllCategories}>
								{$t('CHARTS.LINE.CLEAR_ALL')}
							</button>
						</div>
					</div>
					<div class="chips-row">
						{#each availableCategories as category}
							<button
								class="chip"
								class:active={selectedCategories.has(category)}
								on:click={() => toggleCategory(category)}
							>
								<img
									src="/icons/{selectedCategories.has(category) ? 'check' : 'add'}.svg"
									alt=""
									class="chip-icon"
								/>
								<span>{category}</span>
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<div class="timeline-footer">
				<div class="footer-stat">
					<img src="/icons/chart.svg" alt="entries" class="footer-icon" />
					<div class="footer-info">
						<span class="footer-label">{$t('CHARTS.PORTFOLIO.INVESTMENT_ENTRIES')}</span>
						<span class="footer-value">{lineChartData.labels ? lineChartData.labels.length : 0}</span>
					</div>
				</div>
				<div class="footer-stat">
					<img src="/icons/history.svg" alt="period" class="footer-icon" />
					<div class="footer-info">
						<span class="footer-label">{$t('CHARTS.PORTFOLIO.PERIOD')}</span>
						<span class="footer-value small">
							{#if lineChartData.labels && lineChartData.labels.length > 0}
								{lineChartData.labels[0]} - {lineChartData.labels[lineChartData.labels.length - 1]}
							{:else}
								N/A
							{/if}
						</span>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="empty-state card__background">
			<div class="empty-icon">
				<img src="/icons/history.svg" alt="No data" />
			</div>
			<h3>{$t('CHARTS.PORTFOLIO.NO_TIMELINE_TITLE')}</h3>
			<p>{$t('CHARTS.PORTFOLIO.NO_TIMELINE_TEXT')}</p>
		</div>
	{/if}
</div>

<style>
	.chart-page {
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

	.stat-icon-wrap.investment {
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
	}

	.stat-value {
		font-size: 1rem;
		font-weight: 700;
		color: var(--primary);
	}

	.stat-value.positive {
		color: #10b981;
	}

	.stat-value.negative {
		color: #ef4444;
	}

	.stat-label {
		font-size: 0.6rem;
		color: var(--tertiary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Portfolio Section */
	.portfolio-section {
		padding: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.portfolio-header {
		margin-bottom: 1rem;
	}

	.portfolio-title,
	.timeline-title {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.section-icon {
		width: 1.5rem;
		height: 1.5rem;
		filter: var(--filter);
	}

	.title-text h2 {
		font-size: 1rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0;
	}

	.title-subtitle {
		font-size: 0.75rem;
		color: var(--tertiary);
	}

	.portfolio-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.doughnut-wrapper {
		display: flex;
		justify-content: center;
		min-height: 180px;
	}

	.portfolio-legend {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0;
	}

	.legend-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--tertiary);
	}

	.legend-dot.investment {
		background: #3B82F6;
	}

	.legend-dot.positive {
		background: #10b981;
	}

	.legend-dot.negative {
		background: #ef4444;
	}

	.legend-label {
		flex: 1;
		font-size: 0.85rem;
		color: var(--tertiary);
	}

	.legend-value {
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--primary);
	}

	.legend-value.positive {
		color: #10b981;
	}

	.legend-value.negative {
		color: #ef4444;
	}

	/* Timeline Section */
	.timeline-section {
		padding: 1.25rem;
	}

	.timeline-header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.view-selector {
		display: flex;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		border: 1px solid var(--border-color);
		overflow: hidden;
	}

	.view-btn {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		padding: 0.625rem 0.5rem;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.view-btn:not(:last-child) {
		border-right: 1px solid var(--border-color);
	}

	.view-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.view-btn.active {
		background: var(--secondary);
	}

	.view-icon {
		width: 1rem;
		height: 1rem;
		filter: brightness(0) invert(0.6);
	}

	.view-btn.active .view-icon {
		filter: brightness(0) invert(1);
	}

	.view-label {
		font-size: 0.65rem;
		font-weight: 600;
		color: var(--tertiary);
		display: none;
	}

	.view-btn.active .view-label {
		color: white;
	}

	.chart-container {
		min-height: 220px;
		margin-bottom: 1rem;
	}

	.no-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 180px;
		color: var(--tertiary);
		text-align: center;
	}

	.no-data-icon {
		width: 2rem;
		height: 2rem;
		filter: brightness(0) invert(0.4);
		margin-bottom: 0.5rem;
	}

	.no-data p {
		font-size: 0.85rem;
		margin: 0;
	}

	/* Filter Section */
	.filter-section {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		border: 1px solid var(--border-color);
		padding: 0.875rem;
		margin-bottom: 1rem;
	}

	.filter-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.filter-title {
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--tertiary);
		text-transform: uppercase;
	}

	.filter-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.filter-btn {
		background: none;
		border: none;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--secondary);
		cursor: pointer;
		padding: 0.125rem 0.25rem;
	}

	.filter-divider {
		color: var(--tertiary);
		opacity: 0.5;
	}

	.chips-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.chip {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.375rem 0.625rem;
		border-radius: 20px;
		border: 1px solid var(--border-color);
		background: transparent;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 0.75rem;
		color: var(--tertiary);
	}

	.chip:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.chip.active {
		background: var(--secondary);
		border-color: var(--secondary);
		color: white;
	}

	.chip-icon {
		width: 0.75rem;
		height: 0.75rem;
		filter: brightness(0) invert(0.6);
	}

	.chip.active .chip-icon {
		filter: brightness(0) invert(1);
	}

	/* Timeline Footer */
	.timeline-footer {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	.footer-stat {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		border: 1px solid var(--border-color);
	}

	.footer-icon {
		width: 1.25rem;
		height: 1.25rem;
		filter: var(--filter);
	}

	.footer-info {
		flex: 1;
		min-width: 0;
	}

	.footer-label {
		display: block;
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--tertiary);
	}

	.footer-value {
		display: block;
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--primary);
	}

	.footer-value.small {
		font-size: 0.75rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Empty State */
	.empty-state {
		padding: 3rem 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.empty-icon {
		width: 4rem;
		height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		margin-bottom: 1rem;
	}

	.empty-icon img {
		width: 2rem;
		height: 2rem;
		filter: brightness(0) invert(0.5);
	}

	.empty-state h3 {
		font-size: 1rem;
		color: var(--primary);
		margin-bottom: 0.5rem;
	}

	.empty-state p {
		font-size: 0.85rem;
		color: var(--tertiary);
		margin: 0;
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

		.stat-label {
			font-size: 0.7rem;
		}

		.portfolio-content {
			flex-direction: row;
			align-items: center;
		}

		.doughnut-wrapper {
			flex: 1;
			min-height: 200px;
		}

		.portfolio-legend {
			flex: 1;
		}

		.view-label {
			display: inline;
		}

		.timeline-footer {
			grid-template-columns: repeat(2, 1fr);
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

		.portfolio-section {
			padding: 1.5rem;
			margin-bottom: 2rem;
		}

		.title-text h2 {
			font-size: 1.125rem;
		}

		.doughnut-wrapper {
			min-height: 220px;
		}

		.timeline-section {
			padding: 1.5rem;
		}

		.timeline-header {
			flex-direction: row;
			align-items: flex-start;
			justify-content: space-between;
		}

		.view-selector {
			flex-shrink: 0;
		}

		.view-btn {
			padding: 0.5rem 0.75rem;
		}

		.chart-container {
			min-height: 300px;
			margin-bottom: 1.5rem;
		}

		.footer-value {
			font-size: 1rem;
		}
	}

	@media (min-width: 1280px) {
		.stat-card {
			padding: 1.75rem;
		}

		.stat-value {
			font-size: 1.75rem;
		}

		.portfolio-section,
		.timeline-section {
			padding: 2rem;
		}

		.title-text h2 {
			font-size: 1.25rem;
		}

		.chart-container {
			min-height: 360px;
		}
	}
</style>
