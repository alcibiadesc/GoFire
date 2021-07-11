<script>
    import Card from "./../atoms/Card.svelte";
    import { notification } from "./../../stores/notification.js";

    let onClick = () => notification.add("saving", { today: 1, amount: 2 });

    export let array =  {
      saving: [{today: '1996-09-11', amount: 123}],
      status: [{today: '2016-08-29', amount: 321}]};
</script>

<Card>
    <h1>Movimientos</h1>
    <h3>Te mostramos todos los cambios realizados</h3>
</Card>

{#each array.saving as { today, amount }}
    <h1>{today}</h1>
    <h1>{amount}</h1>
{/each}
