<script>
    import { signIn } from "./../../firebase/firebase-auth";
    import { landing } from "./../../stores/landing";
    import Credit from "./../atoms/Credit.svelte";
    import { t } from "./../../i18n/i18n";
</script>

<div class="text-center gridding md:w-6/12">
    <img class="rounded-lg w-32" src="/icons/gofire.svg" alt="gofire logo" />
    <h2 class="font-mono mt-14">{$t("LANDING.DESCRIPTION")}</h2>
    <button class="m-14 " on:click={() => ($landing = !$landing)}
        >{$t("LANDING.CALL_TO_ACTION")}

        <img class="inline-block w-6" src="/icons/arrow.svg" alt="launch app" />
    </button>
</div>
<div class="absolute inset-x-0 bottom-0 p-8">
    <Credit />
</div>

<style>
    .gridding {
        display: grid;
        place-items: center;
    }
    button {
        background-color: var(--secondary);
        color: white;
        font-weight: 600;
        padding: 1rem;
        border-radius: 15px;
    }
    button:hover {
        opacity: 0.8;
    }

    * {
        max-width: 100vw;
    }
</style>
