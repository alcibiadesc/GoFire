<script>
  import Input from "./../atoms/Input.svelte";
  import { apis } from "./../../stores/apis.js";
  import { t } from "../../i18n/i18n";

  const inputs = [
    {
      label: "kraken",
      placeholder: "add your API",
      type: "text",
      icon: false,
      api: "",
    },
  ];

  let apiObj = {};
  $: inputs.map((value) => {
    value.api ? (apiObj = { ...apiObj, [value.label]: value.api }) : "";
    apis.set(apiObj);
  });
</script>

<h1>{$t('APIS.TITLE')}</h1>
{#each inputs as { label, placeholder, type, icon, api }}
  <Input bind:value={api} {label} {placeholder} {type} />
{/each}
