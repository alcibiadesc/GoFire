<script>
  import Button from "./Button.svelte";
  import { formatBasic } from "./../../scripts/scripts.js";
  import { t } from "./../../i18n/i18n";

  export let removeSaving = () => {};
  export let savings = [];
  export let id = 0;
</script>

<table class="text-center w-full">
  <thead>
    <tr>
      <th>{$t("SETTINGS.MODAL.TABLE.DATE")}</th>

      <th>{$t("SETTINGS.MODAL.TABLE.AMOUNT")}</th>
    </tr>
  </thead>

  <tbody>
    {#each savings as { today, amount, id_saving }}
      <tr>
        <td class="text-xs"> {today}</td>
        <td> {formatBasic(amount)}</td>
        <td>
          <Button
            prop={{
              icon: "delete",
              style: "tertiary",
              onClick: () => removeSaving(id, id_saving),
            }}
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  th {
    color: var(--tertiary);
  }

  td {
    color: var(--primary);
  }
</style>
