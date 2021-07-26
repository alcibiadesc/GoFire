<script>
    import { t } from "./../../i18n/i18n";
</script>

<h1 class="text-center mb-6">{$t("FAQS.TITLE")}</h1>

<div class="text-left w-8/12 m-12">
    <h2 class="text-left">{$t("FAQS.FAQ_1.TITLE")}</h2>
    <p>
        {$t("FAQS.FAQ_1.DESCRIPTION")}
    </p>
    <div class="gridding">
        <img class="gif" src="/gif/add_goal.gif" alt="add goal" />
    </div>
</div>

<div class="text-left w-8/12 m-12">
    <h2 class="text-left">{$t("FAQS.FAQ_2.TITLE")}</h2>
    <p>
        {$t("FAQS.FAQ_2.DESCRIPTION")}
    </p>
    <div class="gridding">
        <img class="gif" src="/gif/create_invest.gif" alt="gif create invest" />
    </div>
</div>

<div class="text-left w-8/12 m-12 ">
    <h2 class="text-left">{$t("FAQS.FAQ_3.TITLE")}</h2>
    <p>
        {$t("FAQS.FAQ_3.DESCRIPTION_1")}
        <span>
            <img class="w-8 inline-block" src="/icons/saving.svg" alt="" />
        </span>

        {$t("FAQS.FAQ_3.DESCRIPTION_2")}
    </p>
    <div class="gridding">
        <img class="gif" src="/gif/add_savings.gif" alt="gif add saving " />
    </div>
</div>

<style>
    h2 {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
        display: inline-block;
        background-color: var(--secondary);
        padding: 0.4rem;
    }
    p {
        font-size: 1rem;
    }

    .gif {
        height: 30rem;
        display: inline-block;
        margin: 1rem;
    }

    .gridding {
        display: grid;
        place-items: center;
        text-align: left;
    }
</style>
