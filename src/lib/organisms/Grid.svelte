<script>
	import Row from "../components/Row.svelte";
	import { data } from "./../../stores/data.js";
	import { flip } from "svelte/animate";
	export let edit = false;

	let hovering = false;

	const drop = (event, target) => {
		event.dataTransfer.dropEffect = "move";
		const start = parseInt(event.dataTransfer.getData("text/plain"));
		const newTracklist = $data;

		if (start < target) {
			newTracklist.splice(target + 1, 0, newTracklist[start]);
			newTracklist.splice(start, 1);
		} else {
			newTracklist.splice(target, 0, newTracklist[start]);
			newTracklist.splice(start + 1, 1);
		}
		data.set(newTracklist);

		hovering = false;
	};

	const dragstart = (event, i) => {
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.dropEffect = "move";
		const start = i;
		event.dataTransfer.setData("text/plain", start);
	};
</script>

{#if $data && edit}
	{#each $data as props, index (props.id)}
		<div
			class="list-item"
			animate:flip
			draggable={true}
			on:dragstart={(event) => dragstart(event, index)}
			on:drop|preventDefault={(event) => drop(event, index)}
			ondragover="return false"
			on:dragenter={() => (hovering = index)}
			class:is-active={hovering === index}
		>
			<Row {edit} {props} {data} />
		</div>
	{/each}
{:else if $data}
	{#each $data as props (props.id)}
		<div>
			<Row {edit} {props} {data} />
		</div>
	{/each}
{/if}

<style>
	.list-item {
		display: block;
		padding: 0.5em 1em;
	}

	.list-item.is-active {
		background-color: var(--secondary);
		color: #fff;
	}
</style>
