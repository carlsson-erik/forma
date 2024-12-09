<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<div class="h-screen w-screen overflow-hidden bg-gray-400">
	<div class="my-24 flex flex-col items-center gap-12">
		<span class="text-9xl text-gray-100"> F </span>
		<div>
			You have chosen {data.activity.name}
		</div>
		<div>We suggest {data.suggestion.name}</div>
	</div>
</div>
