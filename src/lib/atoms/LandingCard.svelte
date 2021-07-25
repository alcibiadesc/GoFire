<script>
    export let props = { img: "theme", title: "Title", copy: "copy" };
    const { img, title, copy } = props;
</script>

<div>
    <h2>{title}</h2>
    <p>{copy}</p>

    <div class="square">
        <img
            loading="lazy"
            src="/gif/{img}.gif"
            alt={img}
            class="bg-cover h-80"
        />
    </div>
</div>

<style>
    img {
        width: auto;
        height: 20rem;
    }

    .square {
        height: 22rem;
        width: 22rem;
        display: grid;
        place-items: center center;
        background: var(--secondary);
    }
    h2 {
        color: var(--primary);
        display: inline-block;
        font-weight: bolder;
        font-size: 1rem;
        text-transform: lowercase;
    }
    p {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.2rem;
        font-weight: 200;
    }
</style>
