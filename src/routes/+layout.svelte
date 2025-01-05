<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="bg-background h-screen w-screen overflow-hidden">
	{@render children()}
</div>
