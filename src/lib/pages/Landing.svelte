<script>
    import { signIn } from "./../../firebase/firebase-auth";
    import LandingCard from "./../atoms/LandingCard.svelte";
    import Credit from "./../atoms/Credit.svelte";
    import LangSelect from "./../atoms/LangSelect.svelte";
    import { t } from "./../../i18n/i18n";

    const cards = [
        {
            img: "create_invest",
            title: $t("LANDING.FEATURES.ADD_INVEST"),
            copy: "",
        },
        {
            img: "custom",
            title: $t("LANDING.FEATURES.CUSTOMIZE"),
            copy: "",
        },
        {
            img: "add_goal",
            title: $t("LANDING.FEATURES.ADD_GOAL"),
            copy: "",
        },
    ];

    const mainImg = { img: "theme", title: "", copy: "" };
</script>

<h1 class=" font-mono text-center md:w-8/12 md:text-left">
    {$t("LANDING.TITLE")}
</h1>

<div
    class="p-8 md:grid md:grid-cols-2 md:place-items-start md:w-8/12 md:align-text-top"
>
    <div>
        <h3 class="md:mt-6 font-mono md:text-left md:pr-8">
            {$t("LANDING.DESCRIPTION")}
        </h3>
        <div class="text-center md:text-left mt-8 font-mono">
            <button on:click={signIn}>{$t("LANDING.CALL_TO_ACTION")}</button>
        </div>
    </div>
    <div class="md:w-4/12 text-center">
        <LandingCard props={mainImg} />
    </div>
</div>

<div class="features font-mono p-8">
    <div class="gridding">
        {#each cards as card}
            <LandingCard props={card} />
        {/each}
    </div>
</div>
<div class="text-center mt-8 font-mono">
    <button on:click={signIn}>{$t("LANDING.CALL_TO_ACTION_2")}</button>
</div>

<Credit />
<div class="float-right mt-8">
    <LangSelect />
</div>

<style>
    .gridding {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        place-items: center;
    }
    button {
        background-color: var(--secondary);
        color: var(--primary);
        padding: 1rem;
        border-radius: 50px;
    }

    .features {
        min-height: 100vh;
        width: 100%;
        background-color: var(--tertiary);
    }
    * {
        max-width: 100vw;
    }
</style>
