<script lang="ts">
	import "@fontsource-variable/inter"
	import "@fontsource/noto-color-emoji"
	import "@unocss/reset/tailwind-compat.css"
	import "uno.css"
</script>

<svelte:head>
	<title>Liru Op Announcement Generator</title>
</svelte:head>

<slot />

<style global>
	:global(body) {
		font-family: "Inter Variable", "Noto Color Emoji", sans-serif;
	}

	:global(button) {
		background-color: transparent;
	}

	:global(html) {
		--at-apply: bg-base1 text-base12 transition-colors scroll-smooth;
	}

	:global(*) {
		scroll-behavior: smooth;
	}

	:global(.dark-theme) {
		color-scheme: dark;
	}
</style>
