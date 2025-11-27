<script lang="ts">
	import Row from '../components/Row.svelte';
	import { data } from '../../stores/data.js';
	import { flip } from 'svelte/animate';
	import Button from '../atoms/Button.svelte';
	import { fade } from 'svelte/transition';

	export let edit = false;
	let hovering = -1;

	const drop = (event: DragEvent, target: number) => {
		if (!event.dataTransfer) return;
		event.dataTransfer.dropEffect = 'move';
		const start = parseInt(event.dataTransfer.getData('text/plain'));
		const newTracklist = [...$data];

		if (start < target) {
			newTracklist.splice(target + 1, 0, newTracklist[start]);
			newTracklist.splice(start, 1);
		} else {
			newTracklist.splice(target, 0, newTracklist[start]);
			newTracklist.splice(start + 1, 1);
		}
		data.set(newTracklist);
		hovering = -1;
	};

	const dragstart = (event: DragEvent, i: number) => {
		if (!event.dataTransfer) return;
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.dropEffect = 'move';
		event.dataTransfer.setData('text/plain', i.toString());
	};
</script>

<div class="grid-container" class:edit-mode={edit} role="list" aria-label="Portfolio categories">
	{#if $data && $data.length > 0 && edit}
		{#each $data as prop, index (prop.id)}
			<div animate:flip={{ duration: 200 }} in:fade class="grid-item-wrapper" role="listitem">
				<div
					class="list-item"
					draggable={true}
					on:dragstart={(event) => dragstart(event, index)}
					on:drop|preventDefault={(event) => drop(event, index)}
					on:dragover|preventDefault
					on:dragenter={() => (hovering = index)}
					class:is-active={hovering === index}
					aria-grabbed="false"
				>
					<Row {edit} {prop} {data} />
				</div>

				<div class="move-btns" aria-label="Reorder controls">
					{#if index !== 0}
						<Button
							prop={{
								icon: 'up',
								style: 'move',
								onClick: () => data.moveUp(index),
							}}
						/>
					{/if}

					{#if index !== $data.length - 1}
						<Button
							prop={{
								icon: 'down',
								style: 'move',
								onClick: () => data.moveDown(index),
							}}
						/>
					{/if}
				</div>
			</div>
		{/each}
	{:else if $data && $data.length > 0 && !edit}
		{#each $data as prop (prop.id)}
			<div in:fade class="grid-item" role="listitem">
				<Row {edit} {prop} {data} />
			</div>
		{/each}
	{:else}
		<div class="empty-state" in:fade>
			<div class="empty-icon">
				<img src="/icons/chart.svg" alt="" />
			</div>
			<h3>No categories yet</h3>
			<p>Add your first investment category to start tracking your portfolio</p>
		</div>
	{/if}
</div>

<style>
	.grid-container {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
	}

	.grid-item-wrapper {
		position: relative;
	}

	.grid-item {
		padding: 0.75rem 1rem;
		background: var(--card__background);
		border-radius: 16px;
		border: 1px solid var(--border-color);
		transition: all 0.2s ease;
	}

	.grid-item:hover {
		border-color: rgba(255, 255, 255, 0.15);
	}

	.list-item {
		padding: 1rem;
		border-radius: 16px;
		transition: all 0.2s ease;
		background: var(--card__background);
		border: 1px solid var(--border-color);
	}

	.list-item:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.list-item.is-active {
		background: var(--secondary);
		border-color: var(--secondary);
	}

	.move-btns {
		display: none;
	}

	/* Desktop Layout */
	@media (min-width: 1024px) {
		.grid-container {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 1.25rem;
		}

		.grid-container.edit-mode {
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		}

		.grid-item {
			padding: 1.25rem 1.5rem;
			min-height: 100px;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.grid-item:hover {
			transform: translateY(-2px);
			box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		}

		.list-item {
			padding: 1.25rem 1.5rem;
		}

		.move-btns {
			display: flex;
			position: absolute;
			top: 1rem;
			left: -3rem;
			flex-direction: column;
			gap: 0.25rem;
		}
	}

	@media (min-width: 1280px) {
		.grid-container {
			grid-template-columns: repeat(3, 1fr);
		}

		.grid-container.edit-mode {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* Empty State */
	.empty-state {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 3rem 1.5rem;
		background: var(--card__background);
		border-radius: 16px;
		border: 1px solid var(--border-color);
	}

	.empty-icon {
		width: 4rem;
		height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		margin-bottom: 1rem;
	}

	.empty-icon img {
		width: 2rem;
		height: 2rem;
		filter: brightness(0) invert(0.5);
	}

	.empty-state h3 {
		font-size: 1.125rem;
		color: var(--primary);
		margin: 0 0 0.5rem 0;
	}

	.empty-state p {
		font-size: 0.9rem;
		color: var(--tertiary);
		margin: 0;
		max-width: 280px;
	}
</style>
