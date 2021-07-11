<script>
  import { format } from "./../../scripts/scripts.js";
  import { fade } from "svelte/transition";
  import { t } from "./../../i18n/i18n";
  export let goal = 0;
  export let balance = 0;

  $: road = goal - balance;
  $: checkGoal = () => goal > balance;
</script>

<div in:fade class="goal  float-right bg-red-500 p-5 ">
  <img class="m-auto" src="icons/goal.svg" alt="goal" />

  {#if checkGoal()}
    <p class="euros text-sm text-center">
      {$t("HOME.TO") + " " + format(road)}
    </p>
    <h6 class="euros text-xs text-center">
      {$t("HOME.OF") + " " + format(goal)}
    </h6>
  {:else}
    <p class="euros text-xs text-center">{$t("HOME.GOAL")}</p>
    <h6 class="euros text-xs text-center">{format(goal)}</h6>
  {/if}
</div>

<style>
  .goal {
    background-color: var(--secondary);
    right: 20px;
    bottom: -3rem;
    height: 8em;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%);
    position: absolute;
  }

  h6 {
    color: var(--primary);
  }

  img {
    filter: var(--filter_primary);
  }
</style>
