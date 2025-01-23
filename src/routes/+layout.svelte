<script lang="ts">
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';

	const { children } = $props();

	const startTransition = () => {
		document.body.classList.add('page-transitioning');
	};

	const endTransition = () => {
		document.body.classList.remove('page-transitioning');
	};
</script>

{#key $page.url}
	<main
		in:fly={{ x: -200, duration: 300, delay: 300 }}
		out:fly={{ x: 200, duration: 300 }}
		onintrostart={startTransition}
		onintroend={endTransition}
		onoutrostart={startTransition}
		onoutroend={endTransition}
	>
		{@render children()}
	</main>
{/key}

  