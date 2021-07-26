<script>
    import { landing } from "./../../stores/landing";
    import Credit from "./../atoms/Credit.svelte";
    import { t } from "./../../i18n/i18n";

    export let toogleGuide = () => console.log("click");
</script>

<div class="text-center gridding md:w-6/12">
    <img class="rounded-lg w-32" src="/icons/gofire.svg" alt="gofire logo" />
    <h2 class="font-mono mt-14">{$t("LANDING.DESCRIPTION")}</h2>
    <button class="mt-14 btn-start" on:click={() => ($landing = false)}
        >{$t("LANDING.CALL_TO_ACTION")}

        <img class="inline-block w-6" src="/icons/arrow.svg" alt="launch app" />
    </button>

    <button class="mt-3 btn-guide" on:click={toogleGuide}>Read the guide</button
    >
</div>
<div class="absolute inset-x-0 bottom-0 p-8">
    <Credit />
</div>

<style>
    .gridding {
        display: grid;
        place-items: center;
    }
    .btn-start {
        background-color: var(--secondary);
        color: white;
        font-weight: 600;
        font-size: 1.3rem;
        padding: 1rem;
        border-radius: 15px;
    }

    .btn-guide {
        background-color: var(--tertiary);
        color: white;
        font-weight: 300;
        padding: 0.8rem;
        border-radius: 15px;
    }
    button:hover {
        opacity: 0.8;
    }

    * {
        max-width: 100vw;
    }
</style>
