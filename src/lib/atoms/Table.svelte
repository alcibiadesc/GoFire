<script>
	import Button from "./Button.svelte";
	import { formatBasic } from "./../../scripts.js";

	export let removeSaving = () => {};
	export let savings = [];
	export let id = 0;
</script>

<table class="text-center w-full">
	<thead>
		<tr>
			<th>FECHA</th>

			<th>CANTIDAD</th>
		</tr>
	</thead>

	<tbody>
		{#each savings as { today, amount, id_saving }}
			<tr>
				<td class="text-xs"> {today}</td>
				<td> {formatBasic(amount)}</td>
				<td>
					<Button
						props={{
							icon: "delete",
							style: "tertiary",
							onClick: () => removeSaving(id, id_saving),
						}}
					/>
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
