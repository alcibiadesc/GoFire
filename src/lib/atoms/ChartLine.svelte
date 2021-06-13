<script>
	export let chart = [
		{ start: 0.0, size: 0.4 },
		{ start: 0.4, size: 1 },
	];
</script>

<table class="charts-css line" id="my-chart">
	<tbody>
		{#each chart as { start, size }}
			<tr>
				<td style="--start: {start}; --size: {size}" />
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 3rem;
		height: 2rem;
		align-self: flex-end;
	}

	#my-chart {
		--color: var(--secondary);
	}
</style>
