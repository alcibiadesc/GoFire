<script>
    import ChartDoughnut from "./../atoms/ChartDoughnut.svelte";
    import Card from "./../atoms/Card.svelte";
    import { data } from "./../../stores/data.js";
    import { round } from "./../../scripts/scripts.js";

    let revenue = 0;
    let saving = 0;

    data.subscribe((val) => {
        if (val) {
            revenue = data.balance() - data.revenue() - data.detectNoSavings();
            saving = data.balance() - revenue;
        }
    });

    let metrics = [
        round(saving, { returnZero: true }),
        round(revenue, { returnZero: true }),
    ];
</script>

<Card>
    <h1>Gráficas</h1>
    <h3>Tus finanzas a un vistazo</h3>
</Card>

<ChartDoughnut {metrics} />
