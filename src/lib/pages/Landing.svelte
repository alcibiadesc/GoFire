<script>
    import { signIn } from "./../../firebase/firebase-auth";
</script>

<div class=" font-mono w-8/12">
    <h1 class="text-left">
        Are you loking for the best way to achieve financial independence?
    </h1>

    <div class="grid sm:grid-cols-2 gap-4 mt-8 justify-self-center">
        <div>
            <h3 class="sm:w-10/12 ">
                GoFire is more than just spreadsheet – it’s a smart app where
                you can follow and track all your investments.
            </h3>

            <div class="mt-8 sm:text-left text-center">
                <button on:click={signIn}>Try it for free!</button>
            </div>
        </div>
        <div>
            <img
                src="https://cfl.dropboxstatic.com/static/images/index/pisces/hero/pisces_rebrand_hero_animation%402x-vfl8kzHGt.gif"
                alt="feature"
            />
        </div>
    </div>
</div>
<div class="features font-mono mt-12 center p-12">
    <div class=" text-center">
        <h1>FEATURES</h1>
    </div>

    <div class=" w-96 p-4 m-3 inline-block">
        <h2>Add invest</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <img
            src="https://cfl.dropboxstatic.com/static/images/index/pisces/hero/pisces_rebrand_hero_animation%402x-vfl8kzHGt.gif"
            alt=""
            class="bg-cover h-80"
        />
    </div>

    <div class=" w-96 p-4 m-3 inline-block">
        <h2>Add invest</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <img
            src="https://cfl.dropboxstatic.com/static/images/index/pisces/hero/pisces_rebrand_hero_animation%402x-vfl8kzHGt.gif"
            alt=""
            class="bg-cover h-80"
        />
    </div>
    <div class=" w-96 p-4 m-3 inline-block">
        <h2>Add invest</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <img
            src="https://cfl.dropboxstatic.com/static/images/index/pisces/hero/pisces_rebrand_hero_animation%402x-vfl8kzHGt.gif"
            alt=""
            class="bg-cover h-80"
        />
    </div>
    <div class=" w-96 p-4 m-3 inline-block">
        <h2>Add invest</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <img
            src="https://cfl.dropboxstatic.com/static/images/index/pisces/hero/pisces_rebrand_hero_animation%402x-vfl8kzHGt.gif"
            alt=""
            class="bg-cover h-80"
        />
    </div>
</div>

<style>
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

    p {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 200;
    }

    h2 {
        color: var(--primary);
        display: inline-block;
        padding: 0.3rem;
        background-color: var(--secondary);
        font-weight: bolder;
        font-size: 1.3rem;
    }
</style>
