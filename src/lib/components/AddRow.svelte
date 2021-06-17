<script>
	import Button from "./../atoms/Button.svelte";
	import { details } from "./../../stores/data.js";
	import { v4 as uuidv4 } from "uuid";

	const props = { icon: "add", style: "secondary" };
	const addRow = () =>
		($details = [
			...$details,
			{
				id: uuidv4(),
				title: "añade un título",
				number: 0,
				percent: 0,
				hightlight: false,
			},
		]);
</script>

<div class="mb-8">
	<Button on:click={addRow} {props} />
</div>
