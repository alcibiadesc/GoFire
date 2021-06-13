<script>
	import Card from "../atoms/Card.svelte";
	import Input from "../atoms/Input.svelte";
	import { data } from "./../../stores/data.js";
</script>

<Card>
	<h1>Opciones</h1>
	<h3>Aquí puedes configurar tu perfil</h3>

	<Input placeholder="Objetivo" bind:value={$data.goal} />

	{$data.goal}
</Card>
