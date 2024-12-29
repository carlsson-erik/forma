<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Button from './Button.svelte';
	let { value = $bindable(), class: className, ...props }: HTMLInputAttributes = $props();
</script>

<div class={'flex gap-1 ' + className}>
	<input
		type="number"
		class={'w-12 rounded border border-gray-400 bg-gray-200 px-2 py-1'}
		{...props}
	/>
	<Button class="bg-gray-400">-</Button>
	<Button>+</Button>
</div>
