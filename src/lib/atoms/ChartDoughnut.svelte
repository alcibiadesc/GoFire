<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import { t } from "./../../i18n/i18n";
  import { theme } from "./../../stores/theme.js";
  
  // Register Chart.js components
  Chart.register(...registerables);

  export let metrics = [80, 20];
  
  // Theme-aware colors
  $: isDark = $theme === 'dark';
  $: themeColors = {
    primary: isDark ? '#FFFFFF' : '#12151a',
    secondary: isDark ? '#7e858d' : '#7d8ca2',
    background: isDark ? '#2a2c31' : '#e1eaf9',
    tooltipBg: isDark ? 'rgba(47, 49, 56, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    // Better color palette for charts
    investment: isDark ? '#3B82F6' : '#2563EB', // Blue for investment
    profit: isDark ? '#10B981' : '#059669', // Green for profit
    investmentHover: isDark ? '#60A5FA' : '#3B82F6',
    profitHover: isDark ? '#34D399' : '#10B981'
  };

  $: data = {
    labels: [$t("CHARTS.DOUGHNUT.SAVING"), $t("CHARTS.DOUGHNUT.PROFIT")],
    datasets: [
      {
        data: metrics,
        backgroundColor: [themeColors.investment, themeColors.profit],
        hoverBackgroundColor: [themeColors.investmentHover, themeColors.profitHover],
        borderWidth: 3,
        borderColor: isDark ? '#2a2c31' : '#ffffff',
        hoverBorderWidth: 4,
        hoverBorderColor: themeColors.primary,
      },
    ],
  };

  $: options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: themeColors.primary,
          font: {
            size: 12,
            weight: '600'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: themeColors.tooltipBg,
        titleColor: themeColors.primary,
        bodyColor: themeColors.primary,
        borderColor: themeColors.investment,
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
        displayColors: true,
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            
            let formatted;
            if (value >= 1000000) {
              formatted = '€' + (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              formatted = '€' + (value / 1000).toFixed(0) + 'K';
            } else {
              formatted = '€' + value.toLocaleString();
            }
            
            return context.label + ': ' + formatted + ' (' + percentage + '%)';
          }
        }
      }
    },
    cutout: '60%',
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeOutQuart'
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };

  let canvas;
  let chart;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'doughnut',
      data,
      options
    });
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });

  // Reactive update when data or theme changes
  $: if (chart && data) {
    chart.data = data;
    chart.options = options;
    chart.update('none'); // Update without animation for theme changes
  }
</script>

<div class="chart-container">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .chart-container {
    position: relative;
    height: 100%;
    width: 100%;
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  canvas {
    max-width: 100%;
    max-height: 100%;
  }

  @media (max-width: 768px) {
    .chart-container {
      min-height: 200px;
    }
  }

  @media (max-width: 480px) {
    .chart-container {
      min-height: 180px;
    }
  }
</style>
