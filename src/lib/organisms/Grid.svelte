<script>
	import Row from "../components/Row.svelte";
	import Revenue from "./../components/Revenue.svelte";
	import { details } from "./../../stores/data.js";
	export let edit = false;
</script>

<Revenue />
{#each $details as props (props.id)}
	<Row {edit} {props} {details} />
{/each}
