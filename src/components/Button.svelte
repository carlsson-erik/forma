<script lang="ts">
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
	//.ButtonHTMLAttributes<HTMLButtonElement
	// interface $$Props extends HTMLButtonAttributes {}
	let { children, class: className, ...props }: HTMLButtonAttributes = $props();
</script>

<button class={'rounded border border-green-400 bg-green-500 px-2 py-1 ' + className} {...props}>
	{@render children?.()}
</button>
