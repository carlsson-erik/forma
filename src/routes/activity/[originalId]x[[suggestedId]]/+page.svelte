<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '../../../components/Button.svelte';
	import type { ActivityType } from '../../../types/activity';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);

	let { originalId, suggestedId } = $derived($page.params);

	let formType: ActivityType | undefined = $state(undefined);
</script>

<div class="h-screen w-screen overflow-hidden bg-gray-400">
	<div class="my-24 flex flex-col items-center gap-12">
		<div class="flex flex-1">
			You have chosen {data.activity.name}
			<div class="flex flex-col items-end">
				<span>Dopamine {data.activity.dopamine}</span>
				<span>Threshold {data.activity.threshold}</span>
				<span>Accomplishment {data.activity.accomplishment}</span>
				<span>Social {data.activity.social}</span>
				<span>Grade{data.activity.grade}</span>
			</div>
		</div>
		<div class="flex flex-1">
			We suggest {data?.suggestion?.name}
			<div class="flex flex-col items-end">
				<span>Dopamine {data.suggestion?.dopamine}</span>
				<span>Threshold {data.suggestion?.threshold}</span>
				<span>Accomplishment {data.suggestion?.accomplishment}</span>
				<span>Social {data.suggestion?.social}</span>
				<span>Grade{data.suggestion?.grade}</span>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<form method="POST" use:enhance>
				<input type="Number" name="originalId" value={originalId} />
				<input type="Number" name="suggestedId" value={suggestedId ?? ''} />
				<input type="text" name="type" value={formType} />
				<Button
					type="submit"
					onclick={() => {
						formType = 'threshold';
					}}>To hard to start</Button
				>
				<Button
					type="submit"
					onclick={() => {
						formType = 'social';
					}}>Too social</Button
				>
				<Button
					type="submit"
					onclick={() => {
						formType = 'dopamine';
					}}>Not fun enough</Button
				>
			</form>
		</div>
	</div>
</div>
