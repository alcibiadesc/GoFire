<script>
	import Button from "../atoms/Button.svelte";
	import Card from "../atoms/Card.svelte";
	import Input from "../atoms/Input.svelte";
	import Grid from "../organisms/Grid.svelte";
	import { data, details } from "./../../stores/data.js";
</script>

<Card>
	<h1>Opciones</h1>
	<h3>Aquí puedes configurar tu perfil</h3>
	<Input label="Objetivo" type="number" bind:value={$data.goal} />
</Card>

<div class="mb-8">
	<Button on:click={details.add} props={{ icon: "add", style: "secondary" }} />
</div>

<Grid edit={true} />
