<script lang="ts">
	import { error } from '@sveltejs/kit';
	import type { PageData } from '../$types';
	import type { ActionData } from './$types';
	import Button from '../../components/Button.svelte';
	import TextInput from '../../components/TextInput.svelte';
	import { tw } from 'twind';
	import paths from '../../utils/paths';
	import NumberInput from '../../components/NumberInput.svelte';

	let name = $state('');
	let stage = $state(0);

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="flex flex-col">
	<div class="mb-24 flex items-center justify-center gap-8">
		<div>{stage >= 1 ? '●' : '○'}</div>
		<div>{stage >= 2 ? '●' : '○'}</div>
		<div>{stage >= 3 ? '●' : '○'}</div>
		<div>{stage >= 4 ? '●' : '○'}</div>
	</div>
	<span
		>{stage === 0
			? 'What is the name of the activity?'
			: stage === 1
				? 'How addictive is the activity?'
				: stage === 2
					? 'How much accomplishment do you feel after the activity?'
					: stage === 3
						? 'How hard is it to start the activity?'
						: 'How social is the activity?'}</span
	>

	<form method="POST" class="m-auto flex w-2/3 flex-col items-center gap-4">
		<TextInput
			name="name"
			type="text"
			bind:value={name}
			class={stage === 0 ? 'visible w-full' : 'hidden'}
		/>
		<NumberInput name="dopamine" class={stage === 1 ? 'visible' : 'hidden'} />
		<NumberInput name="accomplishment" class={stage === 2 ? 'visible' : 'hidden'} />
		<NumberInput name="threshold" class={stage === 3 ? 'visible' : 'hidden'} />
		<NumberInput name="social" class={stage === 4 ? 'visible' : 'hidden'} />

		<div class="flex justify-end gap-2">
			{#if stage <= 0}
				<a href={paths.home.root}>
					<Button class="" type="button" onclick={() => {}}>Cancel</Button>
				</a>
			{:else}
				<Button
					class=""
					type="button"
					onclick={() => {
						stage--;
					}}
				>
					Back
				</Button>
			{/if}
			<Button
				class={stage >= 4 ? tw`hidden` : tw`visible`}
				type={'button'}
				onclick={() => {
					stage++;
				}}
			>
				Next
			</Button>

			<Button class={stage >= 4 ? 'visible' : 'hidden'}>Create</Button>
		</div>
	</form>
	<div>{form?.error}</div>
</div>
