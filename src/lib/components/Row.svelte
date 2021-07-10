<script>
  import { format, formatPercent } from "./../../scripts.js";
  import ModalSavings from "./../components/ModalSavings.svelte";
  import Button from "./../atoms/Button.svelte";
  import Tooltip from "./../atoms/Tooltip.svelte";

  export let edit = false;
  export let data = [];
  export let prop = {
    id: "9c72c81f-480d-4575-bdff-45e50afc7a33",
    title: "Total Title",
    number: 0,
    hightlight: false,
    saving: [],
  };

  let { id, title, number, hightlight, saving } = prop;

  export let hideModal = true;
  const toogleModal = () => (hideModal = !hideModal);

  const actions = {
    remove: () => data.remove(id),
    changeName: () => data.change(id, "title", title),
    changeNumber: () => data.change(id, "number", number),
    changeHigh: () => data.change(id, "hightlight", hightlight),
    toogleHigh: () => {
      hightlight = !hightlight;
      changeHigh();
    },
  };
  const { changeName, changeNumber, changeHigh, remove, toogleHigh } = actions;

  const btns = [
    { icon: "delete", style: "tertiary", onClick: remove, label: "eliminar" },
    {
      icon: "highlight",
      style: "tertiary",
      onClick: toogleHigh,
      label: "destacar",
    },
    {
      icon: "saving",
      style: "tertiary",
      onClick: toogleModal,
      label: "aportación",
    },
  ];

  $: getSaving = saving.reduce((acc, crt) => acc + crt.amount, 0);
  $: revenue = number - getSaving;
  $: percent = (number - getSaving) / getSaving;
</script>

<ModalSavings
  {hideModal}
  {title}
  {id}
  save={data.saving}
  savings={prop.saving}
  removeSaving={data.removeSaving}
/>

<div class="w-64 m-3 relative" class:hightlight>
  {#if edit}
    <div draggable="true">
      <input
        name="title"
        on:change={changeName}
        bind:value={title}
        class="title w-64"
        type="text"
      />
      <div class="data">
        <input
          name="number"
          on:change={changeNumber}
          bind:value={number}
          type="number"
        />
        {#if isFinite(percent)}
          <p class=" percent">{formatPercent(percent)}</p>
        {/if}
      </div>
      <div class=" flex flex-row float-right">
        {#each btns as btn}
          <Tooltip label={btn.label}>
            <div>
              <Button prop={btn} />
            </div>
          </Tooltip>
        {/each}
      </div>
    </div>
  {:else}
    <h6 class="mb-1">{title}</h6>
    <div class="data">
      <p class="euros">{format(number)}</p>

      {#if isFinite(percent)}
        <p class=" percent">{formatPercent(percent)}</p>
      {/if}
    </div>
  {/if}
  {#if saving.length > 0 && !edit}
    <h3 class="mt-1 revenue text-sm">Rentabilidad: {format(revenue)}</h3>
  {/if}
</div>

<style>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .title {
    border: none;
    width: 100%;
    color: var(--tertiary);
  }
  input {
    background: none;
    border-bottom: 1px solid var(--tertiary);
    color: var(--primary);
    margin-right: 2rem;
    width: 8rem;
  }
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

  button {
    color: var(--tertiary);
  }
</style>
