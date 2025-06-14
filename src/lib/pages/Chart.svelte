<script>
    import ChartDoughnut from "./../atoms/ChartDoughnut.svelte";
    import ChartLine from "./../atoms/ChartLine.svelte";
    import Card from "./../atoms/Card.svelte";
    import { data } from "./../../stores/data.js";
    import { round } from "./../../scripts/scripts.js";
    import { t } from "./../../i18n/i18n";

    let revenue = 0;
    let saving = 0;
    let lineChartData = {
        labels: [],
        datasets: [{
            label: $t("CHARTS.LINE.SAVINGS_PROGRESSION"),
            data: [],
            borderColor: "hsl(200, 78%, 52%)",
            backgroundColor: "hsla(200, 78%, 52%, 0.1)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "hsl(200, 78%, 52%)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 4,
        }]
    };

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

        // Create cumulative data
        let cumulativeAmount = 0;
        let labels = [];
        let cumulativeData = [];

        processedData.forEach(saving => {
            cumulativeAmount += saving.amount;
            
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
            cumulativeData.push(round(cumulativeAmount, { returnZero: true }));
        });

        return {
            labels,
            datasets: [{
                label: $t("CHARTS.LINE.SAVINGS_PROGRESSION"),
                data: cumulativeData,
                borderColor: "hsl(200, 78%, 52%)",
                backgroundColor: "hsla(200, 78%, 52%, 0.1)",
                fill: true,
                tension: 0.3,
                pointBackgroundColor: "hsl(200, 78%, 52%)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: yearsDiff > 5 ? 3 : 4,
                pointHoverRadius: 6,
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
</script>

<!-- Header Section -->
<div class="charts-header mb-8">
    <Card>
        <h1 class="text-3xl font-bold mb-2">{$t("CHARTS.TITLE")}</h1>
        <h3 class="text-lg text-gray-600">{$t("CHARTS.SUBTITLE")}</h3>
    </Card>
</div>

<!-- Charts Grid -->
<div class="charts-grid">
    <!-- Distribution Chart -->
    <div class="chart-section">
        <Card>
            <h2 class="text-xl font-semibold mb-4">Portfolio Distribution</h2>
            <div class="chart-wrapper">
                <ChartDoughnut {metrics} />
            </div>
        </Card>
    </div>

    <!-- Temporal Chart -->
    {#if lineChartData.labels && lineChartData.labels.length > 0}
        <div class="chart-section">
            <Card>
                <h2 class="text-xl font-semibold mb-2">{$t("CHARTS.LINE.CARD_TITLE")}</h2>
                <p class="text-gray-600 mb-4">{$t("CHARTS.LINE.CARD_SUBTITLE")}</p>
                <div class="chart-wrapper line-chart">
                    <ChartLine data={lineChartData} />
                </div>
            </Card>
        </div>
    {:else}
        <div class="chart-section">
            <Card>
                <h2 class="text-xl font-semibold mb-2">{$t("CHARTS.LINE.CARD_TITLE")}</h2>
                <div class="empty-state">
                    <div class="empty-icon">📊</div>
                    <p class="text-gray-500 text-center">
                        Add investment contributions with dates to see your investment timeline
                    </p>
                </div>
            </Card>
        </div>
    {/if}
</div>

<style>
    .charts-header {
        margin-bottom: 2rem;
    }

    .charts-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    @media (min-width: 768px) {
        .charts-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (min-width: 1024px) {
        .charts-grid {
            grid-template-columns: 400px 1fr;
        }
    }

    .chart-section {
        min-height: 400px;
    }

    .chart-wrapper {
        position: relative;
        height: 300px;
        width: 100%;
    }

    .line-chart {
        height: 350px;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 300px;
        padding: 2rem;
    }

    .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }

    :global(.chart-section .card) {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    :global(.chart-section .card > div) {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
</style>
