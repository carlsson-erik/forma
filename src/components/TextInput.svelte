<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {}
	let { value = $bindable(), ...props }: $$Props = $props();
</script>

<input type="text" class="rounded border border-gray-400 bg-gray-200 px-2 py-1" {...props} />
