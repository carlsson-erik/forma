<script lang="ts">
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import type { PageData } from './$types';
	import paths from '../../../../utils/paths';
	import { enhance } from '$app/forms';
	import Button from '../../../../components/Button.svelte';
	let metric = $derived($page.params['metric']) as
		| 'threshold'
		| 'social'
		| 'accomplishment'
		| 'dopamine';
	console.log(metric);

	const { data } = $props();
	console.log(data.activities);
</script>

<div class="w-full p-4">
	<div class="flex gap-2 underline">
		<a href={paths.activity.edit.dopamine}>Dopamine </a>
		<a href={paths.activity.edit.threshold}>Threshold</a>
		<a href={paths.activity.edit.accomplishment}>Accomplishment</a>
		<a href={paths.activity.edit.social}>Social</a>
	</div>
	<span class="text-4xl text-gray-100">{metric} </span>
	{#each data.activities as activity}
		<div class="flex items-center gap-2 rounded border p-1">
			<form method="POST" use:enhance>
				{activity.name}
				<input class="hidden" type="number" name="id" value={activity.id} />
				<input class="hidden" name="type" type="text" value={metric} />
				<input type="number" name="value" value={activity[metric]} />
				<button type="submit">Save</button>
			</form>
		</div>
	{/each}
</div>
