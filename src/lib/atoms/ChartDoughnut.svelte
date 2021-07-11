<script>
  import Doughnut from "svelte-chartjs/src/Doughnut.svelte";

  export let metrics = [80, 20];
  export let data = {
    labels: ["Aportaciones", "Rentabilidad"],
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
</script>

<Doughnut {data} {options} />
