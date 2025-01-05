<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	interface $$Props extends HTMLTextareaAttributes {}
	let { value = $bindable(), class: myClass, ...props }: $$Props = $props();
</script>

<textarea
	class={'rounded-xl border border-gray-400 bg-gray-200 px-2 py-1 ' + myClass}
	rows="4"
	{...props}
>
</textarea>
