<script>
	import { theme } from "./../../stores/theme.js";

	const selectTheme = () => ($theme === "light" ? false : true);
	let checked = selectTheme();
	$: checked ? theme.set("dark") : theme.set("light");
</script>

<input type="checkbox" bind:checked id="toggle" class="toggle--checkbox" />

<label for="toggle" class="toggle--label">
	<span class="toggle--label-background" />
</label>
<div class="background" />

<style>
	:root {
		/** sunny side **/
		--blue-background: #c2e9f6;
		--blue-border: #72cce3;
		--blue-color: #96dcee;
		--yellow-background: #fffaa8;
		--yellow-border: #f5eb71;
		/** dark side **/
		--indigo-background: #808fc7;
		--indigo-border: #5d6baa;
		--indigo-color: #6b7abb;
		--gray-border: #e8e8ea;
		--gray-dots: #e8e8ea;
		/** general **/
		--white: #fff;
	}

	* {
		margin: 0;
		padding: 0;
	}

	body {
		display: grid;
		place-items: center;
		min-height: 100vh;
		position: relative;
	}

	.background {
		position: absolute;
		left: 0;
		top: 0;
		background: var(--background);
		z-index: -10;
		width: 100%;
		height: 100vh;
		transition: all 250ms ease-in;
	}

	.toggle--checkbox {
		display: none;
	}
	.toggle--checkbox:checked {
		/** This will all flip from sun to moon **/
		/** Change the label color **/
	}
	.toggle--checkbox:checked ~ .background {
		background: var(--background);
	}
	.toggle--checkbox:checked + .toggle--label {
		background: var(--background);
		border-color: var(--tertiary);
		/** Change the cloud to stars **/
		/** Change the sun into the moon **/
		/** Show the dimples on the moon **/
	}
	.toggle--checkbox:checked + .toggle--label .toggle--label-background {
		left: 30px;
		width: 2.5px;
	}
	.toggle--checkbox:checked + .toggle--label .toggle--label-background:before {
		width: 2.5px;
		height: 2.5px;
		top: -12.5px;
	}
	.toggle--checkbox:checked + .toggle--label .toggle--label-background:after {
		width: 2.5px;
		height: 2.5px;
		left: -15px;
		top: 10px;
	}
	.toggle--checkbox:checked + .toggle--label:before {
		background: var(--white);
		border-color: var(--gray-border);
		animation-name: switch;
		animation-duration: 350ms;
		animation-fill-mode: forwards;
	}
	.toggle--checkbox:checked + .toggle--label:after {
		transition-delay: 350ms;
		opacity: 1;
	}
	.toggle--label {
		/** Placeholder element, starting at blue **/
		width: 100px;
		height: 50px;
		background: #228ee4;
		border-radius: 50px;
		border: 2.5px solid var(--secondary);
		display: flex;
		position: relative;
		transition: all 350ms ease-in;
		/** The sun cloud and moon stars **/
		/** Sun/Moon element **/
		/** Gray dots on the moon **/
	}
	.toggle--label-background {
		width: 5px;
		height: 2.5px;
		border-radius: 2.5px;
		position: relative;
		background: var(--white);
		left: 67.5px;
		top: 22.5px;
		transition: all 150ms ease-in;
	}
	.toggle--label-background:before {
		content: "";
		position: absolute;
		top: -2.5px;
		width: 20px;
		height: 2.5px;
		border-radius: 2.5px;
		background: var(--white);
		left: -10px;
		transition: all 150ms ease-in;
	}
	.toggle--label-background:after {
		content: "";
		position: absolute;
		top: 2.5px;
		width: 20px;
		height: 2.5px;
		border-radius: 2.5px;
		background: var(--white);
		left: -5px;
		transition: all 150ms ease-in;
	}
	.toggle--label:before {
		animation-name: reverse;
		animation-duration: 350ms;
		animation-fill-mode: forwards;
		transition: all 350ms ease-in;
		content: "";
		width: 41px;
		height: 41px;
		border: 2.5px solid var(--yellow-border);
		top: 2px;
		left: 2px;
		position: absolute;
		border-radius: 41px;
		background: var(--yellow-background);
	}
	.toggle--label:after {
		transition-delay: 0ms;
		transition: all 250ms ease-in;
		position: absolute;
		content: "";
		box-shadow: var(--gray-dots) -6.5px 0 0 1px,
			var(--gray-dots) -12px 7px 0 -1px;
		left: 71.5px;
		top: 11.5px;
		width: 5px;
		height: 5px;
		background: transparent;
		border-radius: 50%;
		opacity: 0;
	}

	@keyframes switch {
		0% {
			left: 2px;
		}
		60% {
			left: 2px;
			width: 56px;
		}
		100% {
			left: 52px;
			width: 41px;
		}
	}
	@keyframes reverse {
		0% {
			left: 52px;
			width: 41px;
		}
		60% {
			left: 36px;
			width: 56px;
		}
		100% {
			left: 2px;
		}
	}
</style>
