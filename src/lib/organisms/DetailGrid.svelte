<script>
	import DetailRow from "../components/DetailRow.svelte";

	const Details = [
		{ id: 1, title: "Rentabilidad Total", number: 0, percent: 0 },
		{ id: 2, title: "Criptos", number: 0, percent: 0 },
		{ id: 3, title: "ETF + Plan de Pensiones", number: 0, percent: 0 },
	];
</script>

{#each Details as { title, number, percent, id }}
	<DetailRow {id} {title} {number} {percent} />
{/each}
