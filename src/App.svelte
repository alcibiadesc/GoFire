<script>
  import Home from "./lib/pages/Home.svelte";
  import User from "./lib/pages/User.svelte";
  import Menu from "./lib/components/Menu.svelte";
  import Settings from "./lib/pages/Settings.svelte";
  import Navbar from "./lib/components/Navbar.svelte";
  import Chart from "./lib/pages/Chart.svelte";
  import { landing } from "./stores/landing";
  import Landing from "./lib/pages/Landing.svelte";
  import Guide from "./lib/components/Guide.svelte";
  import Switch from "./lib/atoms/Switch.svelte";

  let current = "home";
  let guide = false;
  const toogleGuide = () => {
    guide = !guide;
    $landing = false;
  };
  const quitGuide = () => (guide = false);
  const selectedBtn = (icon) => {
    current = icon;
  };

  const pages = {
    home: Home,
    tune: User,
    lightning: Settings,
    chart: Chart,
  };

  $: if ($landing === false) {
    current = "home";
  }

  $: page = pages[current];
</script>

<Navbar {toogleGuide} {guide} {quitGuide} landing={$landing} />

{#if guide}
  <Guide />
{:else if $landing}
  <Landing {toogleGuide} />
{:else}
  <svelte:component this={page} />
  <Menu {current} {selectedBtn} />
{/if}
