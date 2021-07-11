<script>
  import Button from "../atoms/Button.svelte";
  import Card from "../atoms/Card.svelte";
  import Input from "../atoms/Input.svelte";
  import Tooltip from "../atoms/Tooltip.svelte";
  import Grid from "../organisms/Grid.svelte";
  import { data } from "./../../stores/data.js";
  import { goal } from "./../../stores/goal.js";
  import { t } from "./../../i18n/i18n";
</script>

<Card>
  <h1>{$t("SETTINGS.TITLE")}</h1>
  <h3>{$t("SETTINGS.SUBTITLE")}</h3>
  <Input label={$t("SETTINGS.GOAL")} type="text" bind:value={$goal} />
</Card>

<Tooltip label="{$t('SETTINGS.TOOLTIPS.ADD')} ">
  <div>
    <Button
      prop={{
        icon: "add",
        style: "secondary",
        onClick: () => data.add($t("SETTINGS.HEADER")),
      }}
    />
  </div>
</Tooltip>

<Grid edit={true} />
