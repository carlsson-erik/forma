<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {}
	let { value = $bindable(), class: myClass, ...props }: $$Props = $props();
</script>

<input type="text" class={'bg-inputBackground rounded px-2 py-1 ' + myClass} {...props} />
