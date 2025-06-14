<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import { t } from "./../../i18n/i18n";
  
  // Register Chart.js components
  Chart.register(...registerables);

  export let metrics = [80, 20];
  export let data = {
    labels: [$t("CHARTS.DOUGHNUT.SAVING"), $t("CHARTS.DOUGHNUT.PROFIT")],
    datasets: [
      {
        data: metrics,
        backgroundColor: ["hsl(3, 75%, 60%)", "hsl(200, 78%, 52%)"],
        hoverBackgroundColor: ["hsl(360, 71%, 73%)", "hsl(206, 85%, 76%)"],
      },
    ],
  };

  export let options = {
    responsive: true,
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

  // Reactive update when data changes
  $: if (chart && data) {
    chart.data = data;
    chart.update();
  }
</script>

<div class="chart-container">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .chart-container {
    position: relative;
    height: 300px;
    width: 100%;
  }
</style>
