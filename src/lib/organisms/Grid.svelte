<script>
	import Row from "../components/Row.svelte";
	import { data } from "./../../stores/data.js";
	export let edit = false;
</script>

{#if $data}
	{#each $data as props (props.id)}
		<Row {edit} {props} {data} />
	{/each}
{/if}
