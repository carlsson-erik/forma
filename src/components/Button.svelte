<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface $$Props extends HTMLButtonAttributes {}
	let { children, ...props }: $$Props = $props();
</script>

<button class="rounded border border-green-400 bg-green-500 px-2 py-1" {...props}>
	{@render children?.()}
</button>
