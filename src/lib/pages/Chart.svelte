<script>
    import ChartDoughnut from "./../atoms/ChartDoughnut.svelte";
    import ChartLine from "./../atoms/ChartLine.svelte";
    import { data } from "./../../stores/data.js";
    import { theme } from "./../../stores/theme.js";
    import { round } from "./../../scripts/scripts.js";
    import { t } from "./../../i18n/i18n";

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
        
        dataArray.forEach(category => {
            if (category.saving && category.saving.length > 0) {
                category.saving.forEach(savingEntry => {
                    if (savingEntry.today && savingEntry.amount) {
                        allSavings.push({
                            date: savingEntry.today,
                            amount: parseFloat(savingEntry.amount) || 0
                        });
                    }
                });
            }
        });

        if (allSavings.length === 0) return { labels: [], datasets: [] };

        // Sort by date
        allSavings.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Determine if we should group by month (for periods longer than 2 years)
        const firstDate = new Date(allSavings[0].date);
        const lastDate = new Date(allSavings[allSavings.length - 1].date);
        const yearsDiff = (lastDate - firstDate) / (1000 * 60 * 60 * 24 * 365);
        
        let processedData = allSavings;
        
        // Group by month if period is longer than 2 years
        if (yearsDiff > 2) {
            processedData = groupDataByPeriod(allSavings);
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
            const change = index > 0 ? cumulativeAmount - previousAmount : 0;
            const changePercent = index > 0 && previousAmount > 0 ? ((change / previousAmount) * 100) : 0;
            
            // Format label based on period length
            let label;
            if (yearsDiff > 2) {
                label = saving.displayDate;
            } else {
                label = new Date(saving.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                });
            }
            
            labels.push(label);
            const roundedAmount = round(cumulativeAmount, { returnZero: true });
            cumulativeData.push(roundedAmount);
            changeData.push({
                amount: roundedAmount,
                change: round(change, { returnZero: true }),
                changePercent: changePercent.toFixed(2),
                isIncrease: change >= 0
            });
        });

        const isDark = $theme === 'dark';
        
        return {
            labels,
            datasets: [{
                label: $t("CHARTS.LINE.SAVINGS_PROGRESSION"),
                data: cumulativeData,
                borderColor: isDark ? "#3B82F6" : "#238EE4",
                backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(35, 142, 228, 0.1)",
                fill: true,
                tension: 0.3,
                pointBackgroundColor: isDark ? "#3B82F6" : "#238EE4",
                pointBorderColor: themeColors.primary,
                pointBorderWidth: 2,
                pointRadius: yearsDiff > 5 ? 3 : 4,
                pointHoverRadius: 6,
                // Store change data for tooltips
                changeData: changeData
            }]
        };
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
<div class="charts-header">
    <div class="header-content">
        <h1 class="main-title">{$t("CHARTS.TITLE")}</h1>
        <p class="main-subtitle">{$t("CHARTS.SUBTITLE")}</p>
    </div>
</div>

<!-- Charts Grid -->
<div class="charts-container">
    <!-- Distribution Chart -->
    <div class="chart-card">
        <div class="chart-header">
            <h2 class="chart-title">📊 Portfolio Distribution</h2>
            <p class="chart-description">Current allocation breakdown</p>
        </div>
        <div class="chart-content">
            <ChartDoughnut {metrics} />
        </div>
        <div class="chart-stats">
            <div class="stat-item">
                <span class="stat-label">Total Investment</span>
                <span class="stat-value">€{round(saving, { returnZero: true }).toLocaleString()}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Total Revenue</span>
                <span class="stat-value">€{round(revenue, { returnZero: true }).toLocaleString()}</span>
            </div>
        </div>
    </div>

    <!-- Temporal Chart -->
    {#if lineChartData.labels && lineChartData.labels.length > 0}
        <div class="chart-card timeline-chart">
            <div class="chart-header">
                <h2 class="chart-title">📈 {$t("CHARTS.LINE.CARD_TITLE")}</h2>
                <p class="chart-description">Track your investment growth over time with interactive zoom controls</p>
            </div>
            <div class="chart-content">
                <ChartLine data={lineChartData} />
            </div>
            <div class="chart-stats">
                <div class="stat-item">
                    <span class="stat-label">Investment Entries</span>
                    <span class="stat-value">{lineChartData.labels.length}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Period</span>
                    <span class="stat-value">
                        {#if lineChartData.labels.length > 0}
                            {lineChartData.labels[0]} - {lineChartData.labels[lineChartData.labels.length - 1]}
                        {:else}
                            N/A
                        {/if}
                    </span>
                </div>
            </div>
        </div>
    {:else}
        <div class="chart-card empty-chart">
            <div class="chart-header">
                <h2 class="chart-title">📈 {$t("CHARTS.LINE.CARD_TITLE")}</h2>
                <p class="chart-description">Track your investment growth over time with interactive zoom controls</p>
            </div>
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <h3 class="empty-title">No Investment Timeline Available</h3>
                <p class="empty-text">
                    Add investment contributions with dates to see your investment progression timeline with zoom controls
                </p>
            </div>
        </div>
    {/if}
</div>

<style>
    .charts-header {
        margin-bottom: 2rem;
        text-align: center;
        padding: 2rem 0;
        border-radius: 20px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        background: var(--card__background);
    }

    .header-content {
        position: relative;
        z-index: 1;
    }

    .main-title {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        letter-spacing: -0.025em;
        color: var(--primary);
    }

    .main-subtitle {
        font-size: 1.125rem;
        opacity: 0.9;
        margin: 0;
        font-weight: 400;
        color: var(--tertiary);
    }

    .charts-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        max-width: 1400px;
        margin: 0 auto;
    }

    .chart-card {
        border-radius: 20px;
        padding: 1.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        border: 1px solid var(--tertiary);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        background: var(--card__background);
    }

    .chart-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    }

    .timeline-chart {
        grid-column: 1 / -1; /* Full width for timeline chart */
    }

    .chart-header {
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .chart-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        letter-spacing: -0.025em;
        color: var(--primary);
    }

    .chart-description {
        font-size: 0.875rem;
        margin: 0;
        font-weight: 500;
        color: var(--tertiary);
    }

    .chart-content {
        height: 400px;
        position: relative;
    }

    .chart-stats {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .stat-item {
        text-align: center;
        padding: 0.75rem;
        border-radius: 12px;
        border: 1px solid var(--tertiary);
        transition: all 0.2s ease;
        background: var(--background__input);
    }

    .stat-item:hover {
        transform: translateY(-1px);
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
        font-size: 3rem;
        margin-bottom: 1rem;
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

    @media (max-width: 768px) {
        .charts-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .timeline-chart {
            grid-column: 1;
        }

        .main-title {
            font-size: 2rem;
        }

        .chart-card {
            padding: 1rem;
        }

        .chart-content {
            height: 300px;
        }

        .empty-state {
            height: 300px;
            padding: 1rem;
        }
    }

    @media (max-width: 480px) {
        .charts-header {
            margin-bottom: 1.5rem;
            padding: 1.5rem 1rem;
        }

        .main-title {
            font-size: 1.75rem;
        }

        .main-subtitle {
            font-size: 1rem;
        }
    }
</style>
