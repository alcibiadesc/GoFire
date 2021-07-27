<script>
  import { user } from "../../stores/user.js";
  import { signIn } from "./../../firebase/firebase-auth.js";
  import Avatar from "./../atoms/Avatar.svelte";
  import { landing } from "./../../stores/landing.js";

  $: img = $user.photoURL ? $user.photoURL : "icons/user.svg";

  export let toogleGuide = () => {
    console.log("click");
  };
  export let guide = false;

  export let quitGuide = () => {};

  const activeLanding = () => {
    $landing = true;
    quitGuide();
  };
</script>

<div class="w-screen p-8">
  <div class="float-left ">
    {#if $landing == false}
      <button>
        <img
          on:click={activeLanding}
          class="w-10 rounded-lg inline-block"
          src="/icons/gofire.svg"
          alt="gofire logo"
        />
      </button>
    {/if}
  </div>
  <div class="float-right">
    <Avatar onClick={signIn} {img} {toogleGuide} {guide} />
  </div>
</div>

<style>
  button:hover {
    opacity: 0.8;
  }
</style>
