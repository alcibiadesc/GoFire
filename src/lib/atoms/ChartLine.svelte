<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import { t } from "./../../i18n/i18n";
  
  // Register Chart.js components
  Chart.register(...registerables);

  export let data = {
    labels: [],
    datasets: [
      {
        label: $t("CHARTS.LINE.SAVINGS_PROGRESSION"),
        data: [],
        borderColor: "hsl(200, 78%, 52%)",
        backgroundColor: "hsla(200, 78%, 52%, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "hsl(200, 78%, 52%)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  let canvas;
  let chart;

  $: options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'hsl(200, 78%, 52%)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: $t("CHARTS.LINE.DATE_AXIS"),
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          drawOnChartArea: true,
          drawTicks: true
        },
        ticks: {
          maxTicksLimit: 8,
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: $t("CHARTS.LINE.AMOUNT_AXIS"),
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          drawOnChartArea: true,
          drawTicks: true
        },
        ticks: {
          callback: function(value) {
            // Format large numbers with K, M suffix
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + 'K';
            }
            return value.toLocaleString();
          }
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
        hitRadius: 8
      },
      line: {
        borderWidth: 3
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  onMount(() => {
    const ctx = canvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data,
      options
    });
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });

  // Reactive update when data changes
  $: if (chart && data) {
    chart.data = data;
    chart.options = options;
    chart.update('none'); // Update without animation for better performance
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
    min-height: 300px;
  }
</style> 