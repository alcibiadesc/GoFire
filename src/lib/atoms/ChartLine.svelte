<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import { t } from "./../../i18n/i18n";
  import { theme } from "./../../stores/theme.js";
  
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
        padding: 12,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            const value = context.parsed.y;
            const datasetIndex = context.datasetIndex;
            const pointIndex = context.dataIndex;
            
            // Get change data if available
            const changeData = context.dataset.changeData;
            
            let formatted;
            if (value >= 1000000) {
              formatted = (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              formatted = (value / 1000).toFixed(0) + 'K';
            } else {
              formatted = value.toLocaleString();
            }
            
            let result = $t("CHARTS.LINE.CUMULATIVE_INVESTMENT") + ': €' + formatted;
            
            // Add change information if available and not the first point
            if (changeData && pointIndex > 0 && changeData[pointIndex]) {
              const change = changeData[pointIndex];
              const changeSymbol = change.isIncrease ? '+' : '';
              const changeColor = change.isIncrease ? '🟢' : '🔴';
              
              let changeFormatted;
              if (Math.abs(change.change) >= 1000000) {
                changeFormatted = (change.change / 1000000).toFixed(1) + 'M';
              } else if (Math.abs(change.change) >= 1000) {
                changeFormatted = (change.change / 1000).toFixed(0) + 'K';
              } else {
                changeFormatted = change.change.toLocaleString();
              }
              
              result += '\n' + changeColor + ' Change: ' + changeSymbol + '€' + changeFormatted + ' (' + changeSymbol + change.changePercent + '%)';
            }
            
            return result;
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
            if (value >= 1000000) {
              return '€' + (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return '€' + (value / 1000).toFixed(0) + 'K';
            }
            return '€' + value.toLocaleString();
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
    min-height: 400px;
    border-radius: 16px;
    padding: 20px;
    border: 1px solid;
    transition: all 0.3s ease;
  }

  .period-controls {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .period-btn {
    padding: 8px 16px;
    border: 1px solid;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    background: transparent;
    min-width: 44px;
    text-align: center;
  }

  .period-btn:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }

  .period-btn.active {
    color: white !important;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .canvas-wrapper {
    height: calc(100% - 60px);
    position: relative;
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
      gap: 6px;
      margin-bottom: 16px;
    }

    .period-btn {
      padding: 6px 12px;
      font-size: 11px;
      min-width: 38px;
    }
  }
</style>