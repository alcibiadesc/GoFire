<script>
	import Home from "./lib/pages/Home.svelte";
	import User from "./lib/pages/User.svelte";
	import FooterMenu from "./lib/components/FooterMenu.svelte";
	import Settings from "./lib/pages/Settings.svelte";
	import Navbar from "./lib/components/Navbar.svelte";
	let current = "home";
	const selectedBtn = (icon) => {
		current = icon;
	};

	const pages = { home: Home, profile: User, lightning: Settings };
	$: page = pages[current];
</script>

<Navbar />
<svelte:component this={page} />
<FooterMenu {current} {selectedBtn} />
