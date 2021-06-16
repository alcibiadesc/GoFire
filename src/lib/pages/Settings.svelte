<script>
	import Card from "../atoms/Card.svelte";
	import Input from "../atoms/Input.svelte";
	import { formatBasic } from "./../../scripts.js";
	import { data } from "./../../stores/data.js";
</script>

<Card>
	<h1>Opciones</h1>
	<h3>Aquí puedes configurar tu perfil</h3>

	<Input type={"number"} placeholder="Objetivo" bind:value={$data.goal} />
</Card>
