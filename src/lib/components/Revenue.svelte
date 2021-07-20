<script>
  import { formatPercent } from "./../../scripts/scripts.js";
  import { t } from "./../../i18n/i18n";
  import { currency, formatNum } from "./../../i18n/currency";

  export let revenue = 0;
  export let percent = 0;
  export let props = {
    title: $t("HOME.PROFIT"),
    hightlight: true,
  };

  let { title, hightlight } = props;

  let revenueFormatted = "";

  $: currency.subscribe((val) => {
    revenueFormatted = formatNum(revenue);
  });
</script>

<div class="w-64 m-3 relative m-6" class:hightlight>
  <h6 class="mb-1">{title}</h6>
  <div class="data">
    <p class="euros">{revenueFormatted}</p>
    <p class="percent">{formatPercent(isNaN(percent) ? 0 : percent)}</p>
  </div>
</div>

<style>
  .percent {
    color: var(--secondary);
    font-size: 1em;
    margin-left: 1rem;
  }
  .hightlight:after {
    content: "";
    background: var(--secondary);
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    left: -20px;
  }

  .data {
    display: flex;
    justify-content: left;
    flex-direction: row;
  }
</style>
