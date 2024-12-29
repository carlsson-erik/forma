<script lang="ts">
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

<div class="flex h-full flex-col items-center space-y-2 overflow-hidden">
	<div class="absolute right-1 top-1 flex flex-col gap-4">
		<button class="rounded border border-gray-200 bg-gray-300" onclick={onClick}
			>{editing ? 'Done' : 'Edit'}</button
		>
		<a class="rounded border border-gray-200 bg-gray-300" href={paths.activity.edit.dopamine}
			>Edit metric</a
		>
	</div>
	<div>
		<span class="text-9xl text-gray-100"> F </span>
	</div>
	<div>
		<a
			class="w-full rounded border border-gray-100 bg-gray-200 p-2 text-center"
			href="/new-activity"
		>
			<button>New activity</button>
		</a>
	</div>
	<input
		type="text"
		class="rounded border border-gray-100 bg-gray-200 p-2"
		placeholder="Search"
		bind:value={search}
	/>

	<div class="flex h-60 flex-col space-y-2 overflow-x-hidden overflow-y-scroll">
		{#each filteredActivites as activity}
			<div class="flex justify-between gap-4">
				<a
					href={'/activity/' + activity.id + 'x'}
					class="grow rounded border border-gray-200 bg-gray-100 px-3 py-1 text-center"
					>{activity.name}</a
				>
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
