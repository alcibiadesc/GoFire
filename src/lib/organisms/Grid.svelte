<script>
	import Row from "../components/Row.svelte";
	import { data } from "./../../stores/data.js";
	import { flip } from "svelte/animate";
	import Button from "./../atoms/Button.svelte";
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
	const moveUp = (index) => {
		if (index !== 0) {
			const newTrackList = $data;
			newTrackList.splice(index - 1, 0, newTrackList[index]);
			newTrackList.splice(index + 1, 1);
			data.set(newTrackList);
		}
	};

	const moveDown = (index) => {
		if (index !== $data.length - 1) {
			const newTrackList = $data;
			newTrackList.splice(index + 2, 0, newTrackList[index]);
			newTrackList.splice(index, 1);
			data.set(newTrackList);
		}
	};
</script>

{#if $data && edit}
	{#each $data as props, index (props.id)}
		<div animate:flip class="relative">
			<div
				class="list-item"
				draggable={true}
				on:dragstart={(event) => dragstart(event, index)}
				on:drop|preventDefault={(event) => drop(event, index)}
				ondragover="return false"
				on:dragenter={() => (hovering = index)}
				class:is-active={hovering === index}
			>
				<Row {edit} {props} {data} {index} />
			</div>

			<div class="move_btns">
				{#if index !== 0}
					<Button
						props={{
							icon: "up",
							style: "move",
							onClick: () => moveUp(index),
						}}
					/>
				{/if}

				{#if index !== $data.length - 1}
					<Button
						props={{
							icon: "down",
							style: "move",
							onClick: () => moveDown(index),
						}}
					/>
				{/if}
			</div>
		</div>
	{/each}
{:else if $data && !edit}
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

	.move_btns {
		position: absolute;
		top: 1rem;
		left: -1rem;
	}
</style>
