<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-screen w-screen overflow-hidden bg-gray-400">
	<a href="/">Home</a>
	<div class="my-24 flex flex-col items-center gap-12">
		{@render children()}
	</div>
</div>
