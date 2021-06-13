<script>
	import DetailRow from "../components/DetailRow.svelte";

	const details = [
		{
			title: "Rentabilidad Total",
			number: 0,
			percent: 0,
			hightlight: true,
		},
		{ title: "Criptos", number: 0, percent: 0, hightlight: false },
		{
			title: "ETF + Plan de Pensiones",
			number: 0,
			percent: 0,
			hightlight: false,
		},
	];
</script>

{#each details as props}
	<DetailRow {props} />
{/each}
