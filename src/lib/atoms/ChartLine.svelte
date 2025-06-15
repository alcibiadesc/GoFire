<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import { t } from "./../../i18n/i18n";
  import { theme } from "./../../stores/theme.js";
  import { currency, formatNum } from "./../../i18n/currency";
  
  // Register Chart.js components
  Chart.register(...registerables);

  export let data = {
    labels: [],
    datasets: [
      {
        label: $t("CHARTS.LINE.SAVINGS_PROGRESSION"),
        data: [],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 3,
        pointRadius: 6,
      },
    ],
  };

  let canvas;
  let chart;
  let selectedPeriod = 'ALL';
  let originalData = { labels: [], datasets: [] };
  let filteredData = { labels: [], datasets: [] };

  // Time period options
  const periods = [
    { key: '1M', label: '1M', months: 1 },
    { key: '3M', label: '3M', months: 3 },
    { key: '6M', label: '6M', months: 6 },
    { key: '1Y', label: '1Y', months: 12 },
    { key: '2Y', label: '2Y', months: 24 },
    { key: '5Y', label: '5Y', months: 60 },
    { key: 'ALL', label: 'ALL', months: null }
  ];

  // Currency formatting helper
  function formatCurrency(value) {
    if (value >= 1000000) {
      const amount = (value / 1000000).toFixed(1);
      const symbol = formatNum(1).replace(/[\d\s.,]/g, ''); // Extract currency symbol
      return `${amount}M ${symbol}`;
    } else if (value >= 1000) {
      const amount = (value / 1000).toFixed(0);
      const symbol = formatNum(1).replace(/[\d\s.,]/g, ''); // Extract currency symbol
      return `${amount}K ${symbol}`;
    } else {
      return formatNum(value, 'standard');
    }
  }

  // Theme-aware colors
  $: isDark = $theme === 'dark';
  $: themeColors = {
    primary: isDark ? '#FFFFFF' : '#12151a',
    secondary: isDark ? '#7e858d' : '#7d8ca2',
    background: isDark ? '#2a2c31' : '#e1eaf9',
    cardBackground: isDark ? '#3b4044' : '#f0faff',
    gridColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    tooltipBg: isDark ? 'rgba(59, 68, 68, 0.95)' : 'rgba(240, 250, 255, 0.95)',
    chartLine: isDark ? '#3B82F6' : '#238EE4',
    chartFill: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(35, 142, 228, 0.1)'
  };

  // Filter data based on selected period
  function filterDataByPeriod(period) {
    if (!originalData.labels || originalData.labels.length === 0) return originalData;
    
    if (period === 'ALL') {
      return originalData;
    }

    const periodConfig = periods.find(p => p.key === period);
    if (!periodConfig) return originalData;

    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setMonth(now.getMonth() - periodConfig.months);

    const filteredLabels = [];
    const filteredDataPoints = [];

    originalData.labels.forEach((label, index) => {
      const labelDate = new Date(label);
      if (labelDate >= cutoffDate) {
        filteredLabels.push(label);
        filteredDataPoints.push(originalData.datasets[0].data[index]);
      }
    });

    return {
      labels: filteredLabels,
      datasets: [{
        ...originalData.datasets[0],
        data: filteredDataPoints,
        borderColor: themeColors.chartLine,
        backgroundColor: themeColors.chartFill,
        pointBorderColor: themeColors.primary
      }]
    };
  }

  // Handle period selection
  function selectPeriod(period) {
    selectedPeriod = period;
    filteredData = filterDataByPeriod(period);
    if (chart) {
      chart.data = filteredData;
      chart.update('active');
    }
  }

  $: options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: themeColors.tooltipBg,
        titleColor: themeColors.primary,
        bodyColor: themeColors.primary,
        borderColor: themeColors.chartLine,
        borderWidth: 2,
        cornerRadius: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13,
        },
        padding: 16,
        displayColors: false,
        titleAlign: 'center',
        bodyAlign: 'left',
        callbacks: {
          title: function(context) {
            return context[0].label || 'Date';
          },
          label: function(context) {
            const value = context.parsed.y;
            const pointIndex = context.dataIndex;
            
            // Get change data if available
            const changeData = context.dataset.changeData;
            
            // Format main value using dynamic currency
            const formatted = formatCurrency(value);
            
            // Create tooltip lines
            const lines = [];
            lines.push('💰 ' + $t("CHARTS.LINE.TOOLTIP_TOTAL_INVESTMENT") + ': ' + formatted);
            
            // Add individual entry amount if available
            if (changeData && changeData[pointIndex]) {
              const change = changeData[pointIndex];
              
                              // Show individual entry amount for individual entries view
                if (change.entryAmount !== undefined) {
                  const entryFormatted = formatCurrency(change.entryAmount);
                  lines.push('');
                  lines.push('📝 ' + $t("CHARTS.LINE.TOOLTIP_ENTRY_AMOUNT") + ': ' + entryFormatted);
                }
              
              // Add change information if not the first point
              if (pointIndex > 0) {
                // Format change amount using dynamic currency
                const changeFormatted = formatCurrency(Math.abs(change.change));
                
                const changeSymbol = change.isIncrease ? '+' : '-';
                const changeIcon = change.isIncrease ? '📈' : '📉';
                const changePercent = Math.abs(parseFloat(change.changePercent));
                
                if (!change.entryAmount) lines.push('');
                lines.push(changeIcon + ' ' + $t("CHARTS.LINE.TOOLTIP_CHANGE") + ': ' + changeSymbol + changeFormatted);
                lines.push('📊 ' + $t("CHARTS.LINE.TOOLTIP_PERCENTAGE") + ': ' + changeSymbol + changePercent.toFixed(1) + '%');
              }
            }
            
            return lines;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: $t("CHARTS.LINE.DATE_AXIS"),
          font: {
            size: 13,
            weight: '600',
            family: 'Inter, -apple-system, system-ui, sans-serif'
          },
          color: themeColors.secondary
        },
        grid: {
          display: true,
          color: themeColors.gridColor,
          drawOnChartArea: true,
          drawTicks: false,
          lineWidth: 1
        },
        ticks: {
          maxTicksLimit: 6,
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
          color: themeColors.secondary,
          font: {
            size: 11,
            weight: '500'
          },
          padding: 8
        },
        border: {
          display: false
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: $t("CHARTS.LINE.AMOUNT_AXIS"),
          font: {
            size: 13,
            weight: '600',
            family: 'Inter, -apple-system, system-ui, sans-serif'
          },
          color: themeColors.secondary
        },
        beginAtZero: true,
        grid: {
          display: true,
          color: themeColors.gridColor,
          drawOnChartArea: true,
          drawTicks: false,
          lineWidth: 1
        },
        ticks: {
          color: themeColors.secondary,
          font: {
            size: 11,
            weight: '500'
          },
          padding: 8,
          callback: function(value) {
            return formatCurrency(value);
          }
        },
        border: {
          display: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      point: {
        hoverRadius: 8,
        hitRadius: 10,
        hoverBorderWidth: 4
      },
      line: {
        borderWidth: 3,
        hoverBorderWidth: 4
      }
    },
    animation: {
      duration: 800,
      easing: 'easeInOutCubic'
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 10,
        left: 10
      }
    }
  };

  onMount(() => {
    const ctx = canvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: filteredData,
      options
    });
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });

  // Update when data changes
  $: if (data && data.labels && data.labels.length > 0) {
    originalData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        borderColor: themeColors.chartLine,
        backgroundColor: themeColors.chartFill,
        pointBorderColor: themeColors.primary
      }))
    };
    filteredData = filterDataByPeriod(selectedPeriod);
    if (chart) {
      chart.data = filteredData;
      chart.options = options;
      chart.update('none');
    }
  }

  // Update theme colors when theme changes
  $: if (chart && themeColors) {
    chart.options = options;
    if (filteredData.datasets && filteredData.datasets[0]) {
      filteredData.datasets[0].borderColor = themeColors.chartLine;
      filteredData.datasets[0].backgroundColor = themeColors.chartFill;
      filteredData.datasets[0].pointBorderColor = themeColors.primary;
      chart.data = filteredData;
    }
    chart.update('none');
  }
</script>

<div class="chart-container" style="background: {themeColors.cardBackground}; border-color: {themeColors.gridColor};">
  <!-- Time Period Controls -->
  <div class="period-controls">
    {#each periods as period}
      <button 
        class="period-btn {selectedPeriod === period.key ? 'active' : ''}"
        style="color: {selectedPeriod === period.key ? themeColors.primary : themeColors.secondary}; 
               background: {selectedPeriod === period.key ? themeColors.chartLine : 'transparent'};
               border-color: {themeColors.gridColor};"
        on:click={() => selectPeriod(period.key)}
      >
        {period.label}
      </button>
    {/each}
  </div>

  <!-- Chart Canvas -->
  <div class="canvas-wrapper">
    <canvas bind:this={canvas}></canvas>
  </div>
</div>

<style>
  .chart-container {
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 16px;
    padding: 16px;
    border: 1px solid;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .period-controls {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
    padding: 0.3rem 0.5rem;
    background: var(--background__input);
    border-radius: 10px;
    border: 1px solid var(--tertiary);
    flex-shrink: 0;
  }

  .period-btn {
    padding: 0.4rem 1rem;
    border: 1px solid var(--tertiary);
    border-radius: 8px;
    background: var(--card__background);
    color: var(--primary);
    cursor: pointer;
    font-size: 0.8125rem;
    font-weight: 600;
    transition: all 0.3s ease;
    min-width: 50px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .period-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
    border-color: #3B82F6;
  }

  .period-btn.active {
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    color: white !important;
    border-color: #3B82F6;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  }

  .period-btn.active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
    pointer-events: none;
  }

  .canvas-wrapper {
    flex: 1;
    position: relative;
    min-height: 300px;
  }

  canvas {
    border-radius: 12px;
  }

  @media (max-width: 640px) {
    .chart-container {
      padding: 16px;
      min-height: 350px;
    }

    .period-controls {
      gap: 0.25rem;
      margin-bottom: 0.75rem;
      padding: 0.25rem 0.4rem;
    }

    .period-btn {
      padding: 0.3rem 0.8rem;
      font-size: 0.75rem;
      min-width: 42px;
    }
  }
</style>