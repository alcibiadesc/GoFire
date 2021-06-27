<script>
	import Home from "./lib/pages/Home.svelte";
	import User from "./lib/pages/User.svelte";
	import Menu from "./lib/components/Menu.svelte";
	import Settings from "./lib/pages/Settings.svelte";
	import Test from "./lib/pages/Test.svelte";
	import Navbar from "./lib/components/Navbar.svelte";
	let current = "home";

	const selectedBtn = (icon) => {
		current = icon;
	};

	const pages = {
		home: Home,
		profile: User,
		lightning: Settings,
		bell: Test,
	};
	$: page = pages[current];
</script>

<Navbar />
<svelte:component this={page} />
<Menu {current} {selectedBtn} />
