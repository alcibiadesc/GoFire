<script>
    import ChartDoughnut from "./../atoms/ChartDoughnut.svelte";
    import ChartLine from "./../atoms/ChartLine.svelte";
    import Card from "./../atoms/Card.svelte";
    import { data } from "./../../stores/data.js";
    import { theme } from "./../../stores/theme.js";
    import { round } from "./../../scripts/scripts.js";
    import { t } from "./../../i18n/i18n";
    import { formatNum } from "./../../i18n/currency";

    let revenue = 0;
    let saving = 0;
    let lineChartData = {
        labels: [],
        datasets: [{
            label: $t("CHARTS.LINE.SAVINGS_PROGRESSION"),
            data: [],
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#3B82F6",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 4,
        }]
    };

    // NEW: State variables for timeline view modes and filters
    let viewMode = 'grouped'; // 'grouped', 'individual', 'current-month'
    let originalSavingsData = [];
    let availableCategories = [];
    let selectedCategories = new Set(); // Categories to show (empty = show all)

    // View mode options
    const viewModes = [
        { key: 'grouped', label: 'CHARTS.LINE.VIEW_GROUPED', icon: '📊' },
        { key: 'individual', label: 'CHARTS.LINE.VIEW_INDIVIDUAL', icon: '📈' },
        { key: 'current-month', label: 'CHARTS.LINE.VIEW_CURRENT_MONTH', icon: '📅' }
    ];

    // Initialize theme colors with defaults
    let themeColors = {
        primary: '#FFFFFF',
        secondary: '#7e858d',
        background: '#2a2c31',
        cardBackground: 'linear-gradient(to bottom, #3b4044, #2f3138)',
        accent: '#e84c2b'
    };

    // Theme-aware colors - reactive to theme changes
    $: {
        const isDark = $theme === 'dark';
        themeColors = {
            primary: isDark ? '#FFFFFF' : '#12151a',
            secondary: isDark ? '#7e858d' : '#7d8ca2',
            background: isDark ? '#2a2c31' : '#e1eaf9',
            cardBackground: isDark ? 'linear-gradient(to bottom, #3b4044, #2f3138)' : 'linear-gradient(to bottom, #f0faff, #cdd9ec)',
            accent: isDark ? '#e84c2b' : '#238EE4'
        };
    }

    // Function to format date for display
    function formatDateForDisplay(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short'
        });
    }

    // Function to group data by month for long periods
    function groupDataByPeriod(allSavings) {
        const grouped = {};
        
        allSavings.forEach(saving => {
            const date = new Date(saving.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!grouped[monthKey]) {
                grouped[monthKey] = {
                    date: monthKey,
                    amount: 0,
                    displayDate: formatDateForDisplay(saving.date)
                };
            }
            grouped[monthKey].amount += saving.amount;
        });

        return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
    }

    // Function to process savings data for temporal chart
    function processTemporalSavings(dataArray) {
        if (!dataArray || dataArray.length === 0) return { labels: [], datasets: [] };

        // Collect all savings with dates from all categories
        let allSavings = [];
        let categories = new Set();
        
        dataArray.forEach(category => {
            const categoryName = category.title || category.name || '';
            if (categoryName.trim() !== '') {
                categories.add(categoryName);
            }
            
            if (category.saving && category.saving.length > 0) {
                category.saving.forEach(savingEntry => {
                    if (savingEntry.today && savingEntry.amount) {
                        allSavings.push({
                            date: savingEntry.today,
                            amount: parseFloat(savingEntry.amount) || 0,
                            category: categoryName // Store category name
                        });
                    }
                });
            }
        });

        // Update available categories
        availableCategories = Array.from(categories).sort();
        
        // Initialize selectedCategories if empty (show all by default)
        if (selectedCategories.size === 0 && availableCategories.length > 0) {
            selectedCategories = new Set(availableCategories);
        }

        if (allSavings.length === 0) return { labels: [], datasets: [] };

        // Sort by date
        allSavings.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Store original data for toggle functionality
        originalSavingsData = [...allSavings];

        // Apply filters based on current settings
        return processDataBasedOnSettings(allSavings);
    }

    // NEW: Function to process data based on current view settings
    function processDataBasedOnSettings(allSavings) {
        let processedSavings = [...allSavings];

        // Filter by selected categories
        if (selectedCategories.size > 0 && selectedCategories.size < availableCategories.length) {
            processedSavings = processedSavings.filter(saving => 
                selectedCategories.has(saving.category)
            );
        }

        // Filter by current month if in current-month mode
        if (viewMode === 'current-month') {
            const now = new Date();
            const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            
            processedSavings = processedSavings.filter(saving => {
                const savingDate = new Date(saving.date);
                return savingDate >= currentMonth && savingDate < nextMonth;
            });
        }

        let processedData = processedSavings;

        // Group by month unless in individual or current-month mode
        if (viewMode === 'grouped') {
            // Determine if we should group by month (auto-group for long periods)
            const firstDate = new Date(processedSavings[0]?.date);
            const lastDate = new Date(processedSavings[processedSavings.length - 1]?.date);
            const yearsDiff = (lastDate - firstDate) / (1000 * 60 * 60 * 24 * 365);
            
            // Always group in grouped mode, or auto-group for long periods
            if (yearsDiff > 2 || viewMode === 'grouped') {
                processedData = groupDataByPeriod(processedSavings);
            }
        }

        // Create cumulative data with change tracking
        let cumulativeAmount = 0;
        let labels = [];
        let cumulativeData = [];
        let changeData = []; // Track changes for tooltips

        processedData.forEach((saving, index) => {
            const previousAmount = cumulativeAmount;
            cumulativeAmount += saving.amount;
            
            // Calculate change from previous point
            const change = index > 0 ? saving.amount : 0;
            const changePercent = index > 0 && previousAmount > 0 ? ((change / previousAmount) * 100) : 0;
            
            // Format label based on view mode
            let label;
            if (viewMode === 'individual' || viewMode === 'current-month') {
                // Show individual entry date and category if available
                const date = new Date(saving.date);
                label = date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                });
                if (saving.category && saving.category.trim() !== '') {
                    label += ` (${saving.category})`;
                }
            } else {
                // Show monthly aggregated view
                if (saving.displayDate) {
                    label = saving.displayDate;
                } else {
                    label = new Date(saving.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
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
                entryAmount: round(saving.amount, { returnZero: true }) // Individual entry amount
            });
        });

        const isDark = $theme === 'dark';
        const yearsDiff = processedSavings.length > 1 ? 
            (new Date(processedSavings[processedSavings.length - 1].date) - new Date(processedSavings[0].date)) / (1000 * 60 * 60 * 24 * 365) : 0;
        
        return {
            labels,
            datasets: [{
                label: (viewMode === 'individual' || viewMode === 'current-month') ? 
                    $t("CHARTS.LINE.INDIVIDUAL_ENTRIES") || "Individual Entries" : 
                    $t("CHARTS.LINE.SAVINGS_PROGRESSION"),
                data: cumulativeData,
                borderColor: isDark ? "#3B82F6" : "#238EE4",
                backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(35, 142, 228, 0.1)",
                fill: true,
                tension: (viewMode === 'individual' || viewMode === 'current-month') ? 0.1 : 0.3,
                pointBackgroundColor: isDark ? "#3B82F6" : "#238EE4",
                pointBorderColor: themeColors.primary,
                pointBorderWidth: 2,
                pointRadius: (viewMode === 'individual' || viewMode === 'current-month') ? 5 : (yearsDiff > 5 ? 3 : 4),
                pointHoverRadius: 6,
                // Store change data for tooltips
                changeData: changeData
            }]
        };
    }

    // NEW: Functions to handle category filtering
    function toggleCategory(category) {
        if (selectedCategories.has(category)) {
            selectedCategories.delete(category);
        } else {
            selectedCategories.add(category);
        }
        selectedCategories = new Set(selectedCategories); // Trigger reactivity
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

    // NEW: Function to handle data updates
    function handleDataUpdate() {
        if (originalSavingsData.length > 0) {
            lineChartData = processDataBasedOnSettings(originalSavingsData);
        }
    }

    // NEW: Function to handle view mode changes
    function handleViewModeChange() {
        handleDataUpdate();
    }

    // NEW: Reactive statements for view and filter changes
    $: if (viewMode !== undefined) {
        handleViewModeChange();
    }

    $: if (selectedCategories) {
        handleDataUpdate();
    }

    data.subscribe((val) => {
        if (val && val.length > 0) {
            revenue = data.balance() - data.revenue() - data.detectNoSavings();
            saving = data.balance() - revenue;
            
            // Process temporal data for line chart
            lineChartData = processTemporalSavings(val);
        }
    });

    let metrics = [
        round(saving, { returnZero: true }),
        round(revenue, { returnZero: true }),
    ];

    $: isDark = $theme === 'dark';
</script>

<!-- Header Section -->
<Card>
    <h1>{$t("CHARTS.TITLE")}</h1>
    <h3>{$t("CHARTS.SUBTITLE")}</h3>
</Card>

<!-- Bento Box Grid -->
<div class="bento-container">
    <!-- Portfolio Distribution Card -->
    <div class="bento-card portfolio-card">
        <div class="card-header">
            <div class="card-icon">
                <img src="/icons/chart.svg" alt="Portfolio" />
            </div>
            <div class="card-title-group">
                        <h2 class="card-title">{$t('CHARTS.PORTFOLIO.TITLE')}</h2>
        <p class="card-subtitle">{$t('CHARTS.PORTFOLIO.SUBTITLE')}</p>
            </div>
        </div>
        <div class="card-content">
            <ChartDoughnut {metrics} />
        </div>
        <div class="card-stats">
            <div class="stat-item investment-stat">
                <div class="stat-icon">
                    <img src="/icons/saving.svg" alt="Investment" />
                </div>
                <div class="stat-info">
                    <span class="stat-label">{$t('CHARTS.PORTFOLIO.TOTAL_INVESTMENT')}</span>
                    <span class="stat-value">{formatNum(round(saving, { returnZero: true }))}</span>
                </div>
            </div>
            <div class="stat-item revenue-stat">
                <div class="stat-icon">
                    <img src="/icons/up.svg" alt="Revenue" />
                </div>
                <div class="stat-info">
                    <span class="stat-label">{$t('CHARTS.PORTFOLIO.TOTAL_REVENUE')}</span>
                    <span class="stat-value">{formatNum(round(revenue, { returnZero: true }))}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Investment Timeline Card -->
    {#if lineChartData.labels && lineChartData.labels.length > 0}
        <div class="bento-card timeline-card">
            <div class="card-header">
                <div class="card-icon">
                    <img src="/icons/history.svg" alt="Timeline" />
                </div>
                <div class="card-title-group">
                    <h2 class="card-title">{$t("CHARTS.LINE.CARD_TITLE")}</h2>
                    <p class="card-subtitle">{$t('CHARTS.LINE.CARD_SUBTITLE')}</p>
                </div>
                <!-- NEW: View Mode Selector -->
                <div class="timeline-controls">
                    <div class="view-selector">
                        {#each viewModes as mode}
                            <button 
                                class="view-option" 
                                class:active={viewMode === mode.key}
                                on:click={() => viewMode = mode.key}
                            >
                                <span class="view-icon">{mode.icon}</span>
                                <span class="view-label">{$t(mode.label)}</span>
                            </button>
                        {/each}
                    </div>

                    <!-- NEW: Category Filter -->
                    {#if availableCategories.length > 1}
                        <div class="category-filter">
                            <div class="filter-header">
                                <span class="filter-title">{$t("CHARTS.LINE.FILTER_CATEGORIES")}</span>
                                <div class="filter-actions">
                                    <button class="filter-action" on:click={selectAllCategories}>
                                        {$t("CHARTS.LINE.SELECT_ALL")}
                                    </button>
                                    <span class="filter-separator">|</span>
                                    <button class="filter-action" on:click={deselectAllCategories}>
                                        {$t("CHARTS.LINE.CLEAR_ALL")}
                                    </button>
                                </div>
                            </div>
                            <div class="category-chips">
                                {#each availableCategories as category}
                                    <button 
                                        class="category-chip" 
                                        class:active={selectedCategories.has(category)}
                                        on:click={() => toggleCategory(category)}
                                    >
                                        <span class="chip-icon">
                                            {selectedCategories.has(category) ? '✓' : '○'}
                                        </span>
                                        <span class="chip-text">{category}</span>
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="card-content">
                <ChartLine data={lineChartData} />
            </div>
            <div class="card-stats timeline-stats">
                <div class="stat-item">
                    <div class="stat-icon">
                        <img src="/icons/chart.svg" alt="Entries" />
                    </div>
                    <div class="stat-info">
                        <span class="stat-label">{$t('CHARTS.PORTFOLIO.INVESTMENT_ENTRIES')}</span>
                        <span class="stat-value">{lineChartData.labels.length}</span>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">
                        <img src="/icons/history.svg" alt="Period" />
                    </div>
                    <div class="stat-info">
                        <span class="stat-label">{$t('CHARTS.PORTFOLIO.PERIOD')}</span>
                        <span class="stat-value period-value">
                            {#if lineChartData.labels.length > 0}
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
        <div class="bento-card timeline-card empty-timeline">
            <div class="card-header">
                <div class="card-icon">
                    <img src="/icons/history.svg" alt="Timeline" />
                </div>
                <div class="card-title-group">
                    <h2 class="card-title">{$t("CHARTS.LINE.CARD_TITLE")}</h2>
                    <p class="card-subtitle">{$t('CHARTS.LINE.CARD_SUBTITLE')}</p>
                </div>
            </div>
            <div class="empty-state">
                <div class="empty-icon">
                    <img src="/icons/chart.svg" alt="No data" />
                </div>
                <h3 class="empty-title">{$t('CHARTS.PORTFOLIO.NO_TIMELINE_TITLE')}</h3>
                <p class="empty-text">
                    {$t('CHARTS.PORTFOLIO.NO_TIMELINE_TEXT')}
                </p>
            </div>
        </div>
    {/if}
</div>

<style>


    .bento-container {
        display: grid;
        grid-template-columns: 400px 1fr;
        grid-template-rows: 1fr;
        gap: 2rem;
        max-width: 1600px;
        margin: 0 auto;
        padding: 0 2rem;
        align-items: stretch;
        min-height: 600px;
    }

    .bento-card {
        border-radius: 24px;
        padding: 2rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        border: 1px solid var(--tertiary);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        background: var(--card__background);
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
    }

    .bento-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        border-color: var(--accent);
    }

    .portfolio-card {
        grid-column: 1;
        grid-row: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .timeline-card {
        grid-column: 2;
        grid-row: 1;
        display: flex;
        flex-direction: column;
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        text-align: left;
        flex-wrap: wrap;
    }

    .card-icon {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--background__input);
        border-radius: 16px;
        border: 1px solid var(--tertiary);
    }

    .card-icon img {
        width: 1.5rem;
        height: 1.5rem;
        filter: var(--filter);
    }

    .card-title-group {
        flex: 1;
    }

    .card-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
        letter-spacing: -0.025em;
        color: var(--primary);
        line-height: 1.3;
    }

    .card-subtitle {
        font-size: 0.875rem;
        margin: 0;
        font-weight: 500;
        color: var(--tertiary);
        line-height: 1.4;
    }

    .card-content {
        flex: 1;
        position: relative;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .portfolio-card .card-content {
        min-height: 320px;
    }

    .timeline-card .card-content {
        min-height: 400px;
        align-items: stretch;
    }

    .card-stats {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .timeline-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .stat-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 16px;
        border: 1px solid var(--tertiary);
        transition: all 0.3s ease;
        background: var(--background__input);
    }

    .stat-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--card__background);
        border-radius: 12px;
        border: 1px solid var(--tertiary);
    }

    .stat-icon img {
        width: 1.25rem;
        height: 1.25rem;
        filter: var(--filter);
    }

    .stat-info {
        flex: 1;
        text-align: left;
    }

    .stat-label {
        display: block;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.25rem;
        color: var(--tertiary);
    }

    .stat-value {
        display: block;
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--primary);
        line-height: 1.2;
    }

    .period-value {
        font-size: 0.875rem;
        font-weight: 600;
    }

    /* NEW: Timeline Controls Container */
    .timeline-controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-left: auto;
        align-items: flex-end;
    }

    /* NEW: View Selector Styles */
    .view-selector {
        display: flex;
        background: var(--background__input);
        border-radius: 12px;
        border: 1px solid var(--tertiary);
        overflow: hidden;
    }

    .view-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 0.75rem 1rem;
        border: none;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        min-width: 64px;
    }

    .view-option:not(:last-child) {
        border-right: 1px solid var(--tertiary);
    }

    .view-option:hover {
        background: var(--tertiary);
    }

    .view-option.active {
        background: var(--accent);
        color: white;
    }

    .view-option.active .view-icon,
    .view-option.active .view-label {
        color: white;
    }

    .view-icon {
        font-size: 1.1rem;
        margin-bottom: 0.125rem;
    }

    .view-label {
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        line-height: 1;
    }

    .view-option:hover .view-label {
        color: var(--primary);
    }

    /* NEW: Category Filter Styles */
    .category-filter {
        background: var(--background__input);
        border-radius: 12px;
        border: 1px solid var(--tertiary);
        padding: 1rem;
        min-width: 240px;
        max-width: 320px;
    }

    .filter-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
    }

    .filter-title {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .filter-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .filter-action {
        background: none;
        border: none;
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--accent);
        cursor: pointer;
        padding: 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        transition: color 0.2s ease;
    }

    .filter-action:hover {
        color: var(--primary);
    }

    .filter-separator {
        color: var(--tertiary);
        font-size: 0.7rem;
    }

    .category-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .category-chip {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.4rem 0.75rem;
        border-radius: 20px;
        border: 1px solid var(--tertiary);
        background: transparent;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--secondary);
    }

    .category-chip:hover {
        background: var(--tertiary);
        color: var(--primary);
    }

    .category-chip.active {
        background: var(--accent);
        border-color: var(--accent);
        color: white;
    }

    .chip-icon {
        font-size: 0.7rem;
        font-weight: bold;
    }

    .chip-text {
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 400px;
        text-align: center;
        padding: 2rem;
    }

    .empty-icon {
        margin-bottom: 1rem;
        opacity: 0.7;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .empty-icon img {
        width: 3rem;
        height: 3rem;
        filter: var(--filter);
        opacity: 0.7;
    }

    .empty-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--primary);
    }

    .empty-text {
        font-size: 0.875rem;
        max-width: 300px;
        line-height: 1.5;
        margin: 0;
        color: var(--tertiary);
    }

    @media (max-width: 1200px) {
        .bento-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            padding: 0 1rem;
            gap: 1.5rem;
            min-height: auto;
        }

        .portfolio-card {
            grid-column: 1;
            grid-row: 1;
        }

        .timeline-card {
            grid-column: 1;
            grid-row: 2;
        }

        .portfolio-card .card-content {
            min-height: 300px;
        }

        .timeline-card .card-content {
            min-height: 400px;
        }

        .timeline-controls {
            margin-left: 0;
            align-items: center;
            width: 100%;
        }

        .view-selector {
            margin-top: 1rem;
            width: 100%;
            justify-content: center;
        }

        .view-option {
            flex: 1;
            min-width: 0;
        }

        .category-filter {
            margin-top: 1rem;
            width: 100%;
            max-width: none;
            min-width: 0;
        }

        .filter-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
    }

    @media (max-width: 768px) {
        .bento-container {
            gap: 1rem;
            padding: 0;
        }

        .bento-card {
            padding: 1.5rem;
            border-radius: 20px;
        }

        .card-header {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }

        .view-selector {
            margin-left: 0;
            margin-top: 1rem;
            justify-content: center;
        }

        .view-label {
            font-size: 0.65rem;
        }

        .card-icon {
            width: 2.5rem;
            height: 2.5rem;
        }

        .card-icon img {
            width: 1.25rem;
            height: 1.25rem;
        }

        .card-content {
            min-height: 250px;
        }

        .portfolio-card .card-content {
            min-height: 220px;
        }

        .timeline-card .card-content {
            min-height: 300px;
        }

        .timeline-stats {
            grid-template-columns: 1fr;
        }

        .main-title {
            font-size: 2rem;
        }

        .empty-state {
            min-height: 280px;
            padding: 1rem;
        }
    }

    @media (max-width: 480px) {
        .charts-header {
            margin-bottom: 1.5rem;
            padding: 1.5rem 1rem;
            border-radius: 20px;
        }

        .main-title {
            font-size: 1.75rem;
        }

        .main-subtitle {
            font-size: 1rem;
        }

        .bento-card {
            padding: 1rem;
            border-radius: 16px;
        }

        .card-content {
            min-height: 200px;
        }

        .portfolio-card .card-content {
            min-height: 180px;
        }

        .timeline-card .card-content {
            min-height: 260px;
        }

        .stat-item {
            padding: 0.75rem;
            gap: 0.75rem;
        }

        .stat-icon {
            width: 2rem;
            height: 2rem;
            font-size: 1.25rem;
        }

        .stat-value {
            font-size: 1rem;
        }

        .card-title {
            font-size: 1.25rem;
        }

        .card-subtitle {
            font-size: 0.8rem;
        }
    }
</style>
