<script lang="ts">
	import TextInput from '../components/TextInput.svelte';
	import paths from '../utils/paths';
	import type { PageData } from './$types';

	let search = $state('');

	let { data }: { data: PageData } = $props();

	let filteredActivites = $derived(
		data.activities.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
	);

	let editing = $state(false);

	const onClick = () => {
		editing = !editing;
	};

	console.log(data.activities);
</script>

<div class="absolute right-2 top-1 flex flex-col gap-4">
	<a class="rounded border border-gray-200 bg-gray-300" href={paths.activity.edit.dopamine}>Edit</a>
</div>
<div class="flex h-full flex-col items-center space-y-2 overflow-hidden px-4">
	<span class="text-center text-2xl">Forma</span>
	<div class="flex w-full items-center">
		<TextInput
			type="text"
			class="grow rounded border border-gray-100 bg-gray-200 p-2"
			placeholder="Search for activities"
			bind:value={search}
		/>
		<a class="p-2 text-center" href="/new-activity">
			<button>+</button>
		</a>
	</div>

	<div class="flex h-60 w-full flex-col space-y-2 overflow-x-hidden overflow-y-scroll">
		{#each filteredActivites as activity}
			<div class="flex w-full justify-between gap-4">
				<a href={'/activity/' + activity.id} class="grow px-3 py-1">{activity.name}</a>
				{#if editing}
					<form method="POST" action="?/delete">
						<input name="id" class="hidden" type="number" value={activity.id} />
						<button type="submit">X</button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
</div>
