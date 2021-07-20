<script>
  import { actionSignOut, signIn } from "./../../firebase/firebase-auth.js";
  import Button from "./../atoms/Button.svelte";
  import Card from "./../atoms/Card.svelte";
  import Tooltip from "./../atoms/Tooltip.svelte";
  import { user } from "./../../stores/user.js";
  import LangSelect from "./../atoms/LangSelect.svelte";
  import CurrencySelect from "./../atoms/CurrencySelect.svelte";
  import { t } from "./../../i18n/i18n";

  const btnsLogin = [
    {
      name: "SignOut",
      label: $t("PROFILE.ONLINE.TOOLTIPS.LOGOUT"),
      icon: "logout",
      style: "primary",
      onClick: actionSignOut,
    },
  ];

  const btnSignin = {
    icon: "login",
    style: "primary",
    onClick: signIn,
  };
</script>

<Card>
  {#if $user.uid}
    <h1>{$t("PROFILE.ONLINE.TITLE")}</h1>
    <h3 class="mb-5">{$t("PROFILE.ONLINE.SUBTITLE")}</h3>
    <img class="mx-auto rounded-lg" src={$user.photoURL} alt="user" />
    <div class="my-8">
      <h2>{$user.displayName}</h2>
      <h2>{$user.email}</h2>
    </div>

    {#each btnsLogin as { label, icon, style, onClick, name } (name)}
      <div class="m-2 flex flex-col">
        <Tooltip {label}>
          <Button prop={{ icon, style, onClick }} />
        </Tooltip>
      </div>
    {/each}
  {:else}
    <h2 class="text-center">{$t("PROFILE.OFFLINE.TITLE")}</h2>
    <div class="m-2 flex flex-col">
      <Tooltip label={$t("PROFILE.OFFLINE.TOOLTIPS.LOGIN")}>
        <Button prop={btnSignin} />
      </Tooltip>
    </div>
  {/if}
</Card>

<div class="sm:w-96 p-4 w-8/12 ">
  <div>
    <h5 class="mb-1">Change your language:</h5>
    <LangSelect />
  </div>
  <div class="mt-5">
    <h5 class="mb-1">Select your currency:</h5>
    <CurrencySelect />
  </div>
</div>
