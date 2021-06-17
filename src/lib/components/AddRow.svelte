<script>
	import Button from "./../atoms/Button.svelte";
	import { v4 as uuidv4 } from "uuid";

	export let details = [];
	const addRow = () =>
		($details = [
			...$details,
			{
				id: uuidv4(),
				title: "Título",
				number: 0,
				revenue: 0,
				percent: 0,
				hightlight: false,
			},
		]);

	const button = { icon: "add", style: "secondary" };
</script>

<div class="mb-8">
	<Button on:click={addRow} props={button} />
</div>
