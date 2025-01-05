<script lang="ts">
	import Button from '../../../components/Button.svelte';
	import TextArea from '../../../components/TextArea.svelte';
	import TextInput from '../../../components/TextInput.svelte';
	import paths from '../../../utils/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<span class="absolute top-6 w-full text-center text-4xl text-gray-100"> F </span>
<div class="h-screen w-screen overflow-hidden">
	<div class="flex flex-col items-center justify-stretch gap-2 px-4 pt-4">
		<span class="text-lg font-bold">We suggest you do this instead of "{data.activity.name}"</span>
		<span>{data.suggestion.name}. {data.suggestion.reason}</span>
		<TextArea
			placeholder="I don't want to do this activity because..."
			class="bg-inputBackground h-24 w-full border-none"
		/>
		<Button class="bg-primary w-full text-white">Submit</Button>
		<a href={paths.home.root}>
			<Button class="w-full border-none bg-transparent">Home</Button>
		</a>
	</div>
</div>
