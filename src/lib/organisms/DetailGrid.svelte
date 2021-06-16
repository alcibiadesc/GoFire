<script>
	import DetailRow from "../components/DetailRow.svelte";
	import { details } from "./../../stores/data.js";
	export let edit = false;
</script>

{#each $details as props (props.id)}
	<div>
		<DetailRow {props} {edit} />
	</div>
{/each}
