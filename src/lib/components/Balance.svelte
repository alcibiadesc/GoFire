<script>
  import { format } from "./../../scripts/scripts.js";
  import Goal from "./../atoms/Goal.svelte";
  import Card from "../atoms/Card.svelte";
  import { user } from "./../../stores/user.js";
  import { goal } from "./../../stores/goal.js";
  import { randomCopy } from "./../../scripts/randomCopy.js";

  export let balance = 0;
  $: name = $user.displayName ? $user.displayName.split(" ")[0] : "crack";
</script>

<Card>
  <h1>
    Hola {name}
  </h1>
  <h3>{randomCopy()}</h3>

  <h3 class="mt-8">Balance</h3>
  <p class="euros">
    {format(balance)}
  </p>

  <Goal {balance} goal={$goal} />
</Card>
