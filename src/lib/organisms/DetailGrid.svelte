<script>
	import DetailRow from "../components/DetailRow.svelte";
	import { details } from "./../../stores/data.js";
	export let edit = false;


	const sum = $details.reduce((acc, crt) => acc + crt.revenue, 0)

	let revenue = {
		id: "fc094e9f-73e8-41a5-814a-7968f624bb08",
		title: "Rentabilidad Total",
		number: sum,
		percent: 0,
		hightlight: true,
	},


</script>

<DetailRow props={revenue} {details} />

{#each $details as props (props.id)}
	<div class="m-3">
		<DetailRow {props} {edit} {details} />
	</div>
{/each}
