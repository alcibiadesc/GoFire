<script>
  import Row from "../components/Row.svelte";
  import { data } from "./../../stores/data.js";
  import { flip } from "svelte/animate";
  import Button from "./../atoms/Button.svelte";
  import { fade } from "svelte/transition";

  export let edit = false;
  let hovering = -1;

  const drop = (event, target) => {
    event.dataTransfer.dropEffect = "move";
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTracklist = $data;

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    data.set(newTracklist);

    hovering = -1;
  };

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    const start = i;
    event.dataTransfer.setData("text/plain", start);
  };
</script>

{#if $data && edit}
  {#each $data as prop, index (prop.id)}
    <div animate:flip in:fade class="relative">
      <div
        class="list-item"
        draggable={true}
        on:dragstart={(event) => dragstart(event, index)}
        on:drop|preventDefault={(event) => drop(event, index)}
        ondragover="return false"
        on:dragenter={() => (hovering = index)}
        class:is-active={hovering === index}
      >
        <Row {edit} {prop} {data} />
      </div>

      <div class="move_btns">
        {#if index !== 0}
          <Button
            prop={{
              icon: "up",
              style: "move",
              onClick: () => data.moveUp(index),
            }}
          />
        {/if}

        {#if index !== $data.length - 1}
          <Button
            prop={{
              icon: "down",
              style: "move",
              onClick: () => data.moveDown(index),
            }}
          />
        {/if}
      </div>
    </div>
  {/each}
{:else if $data && !edit}
  {#each $data as prop (prop.id)}
    <div in:fade>
      <Row {edit} {prop} {data} />
    </div>
  {/each}
{/if}

<style>
  .list-item {
    display: block;
    padding: 0.5em 1em;
  }

  .list-item.is-active {
    background-color: var(--secondary);
    color: #fff;
  }

  .move_btns {
    position: absolute;
    top: 1rem;
    left: -1rem;
  }
</style>
