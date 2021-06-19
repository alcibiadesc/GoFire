<script>
	import Row from "../components/Row.svelte";
	import { details } from "./../../stores/data.js";
	export let edit = false;
</script>

{#each $details as props, index (props.id)}
	<Row {edit} {props} {details} {index} />
{/each}
