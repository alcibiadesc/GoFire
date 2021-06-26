<script>
	import Button from "./Button.svelte";
	import { formatBasic } from "./../../scripts.js";

	export let savings = [];
	const btn = { icon: "delete", style: "tertiary" };
</script>

<table class="text-center w-full">
	<thead>
		<tr>
			<th>FECHA</th>

			<th>CANTIDAD</th>
		</tr>
	</thead>

	<tbody>
		{#each savings as { today, amount }}
			<tr>
				<td> {today}</td>
				<td> {formatBasic(amount)}</td>
				<td>
					<Button props={btn} />
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th {
		color: var(--tertiary);
	}

	td {
		color: var(--primary);
	}
</style>
