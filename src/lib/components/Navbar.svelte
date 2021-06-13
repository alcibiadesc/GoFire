<script>
	import Button from "../atoms/Button.svelte";
	import Avatar from "./../atoms/Avatar.svelte";
	const buttom = {
		icon: "menu",
		style: "primary",
	};
</script>

<div class="w-screen p-8">
	<div class="float-right">
		<Avatar />
	</div>
	<div class="float-left">
		<Button props={buttom} />
	</div>
</div>
