<script>
  import Button from "../atoms/Button.svelte";
  import Card from "../atoms/Card.svelte";
  import Input from "../atoms/Input.svelte";
  import Tooltip from "../atoms/Tooltip.svelte";
  import Grid from "../organisms/Grid.svelte";
  import { data } from "./../../stores/data.js";
  import { goal } from "./../../stores/goal.js";
</script>

<Card>
  <h1>Edición</h1>
  <h3>Configura tus fuentes de ingresos</h3>
  <Input label="Objetivo" type="text" bind:value={$goal} />
</Card>

<Tooltip label="añadir nueva categoría ">
  <div>
    <Button  prop={{ icon: "add", style: "secondary", onClick: data.add }} />
  </div>
</Tooltip>

<Grid edit={true} />
