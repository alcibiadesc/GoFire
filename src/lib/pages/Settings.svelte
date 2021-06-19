<script>
	import Button from "../atoms/Button.svelte";
	import Card from "../atoms/Card.svelte";
	import Input from "../atoms/Input.svelte";
	import Grid from "../organisms/Grid.svelte";
	import { goal, details } from "./../../stores/data.js";
</script>

<Card>
	<h1>Opciones</h1>
	<h3>Configura tus fuentes de ingresos</h3>
	<Input label="Objetivo" type="number" bind:value={$goal} />
</Card>

<div>
	<Button on:click={details.add} props={{ icon: "add", style: "secondary" }} />
</div>

<Grid edit={true} />
