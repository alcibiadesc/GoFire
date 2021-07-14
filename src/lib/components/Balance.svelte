<script>
  import { format } from "./../../scripts/scripts.js";
  import Goal from "./../atoms/Goal.svelte";
  import Card from "../atoms/Card.svelte";
  import { user } from "./../../stores/user.js";
  import { goal } from "./../../stores/goal.js";
  import { t } from "./../../i18n/i18n";

  export let balance = 0;
  $: name = $user.displayName ? $user.displayName.split(" ")[0] : "crack";
</script>

<Card>
  <h1>
    {$t("HOME.HI") + " " + name}
  </h1>
  <h3>{$t("HOME.SUBTITLE")}</h3>

  <h3 class="mt-8">{$t("HOME.BALANCE")}</h3>
  <p class="euros">
    {format(balance)}
  </p>

  <Goal {balance} goal={$goal} />
</Card>
