<script>
	import Card from "../atoms/Card.svelte";
	import Input from "../atoms/Input.svelte";
	import DetailGrid from "../organisms/DetailGrid.svelte";
	import { data } from "./../../stores/data.js";
	import AddRow from "./../components/AddRow.svelte";
</script>

<Card>
	<h1>Opciones</h1>
	<h3>Aquí puedes configurar tu perfil</h3>
	<Input label="objetivo" type={"number"} bind:value={$data.goal} />
</Card>

<AddRow />
<DetailGrid edit={true} />
