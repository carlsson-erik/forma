<script lang="ts">
	import { error } from '@sveltejs/kit';
	import type { PageData } from '../$types';
	import type { ActionData } from './$types';
	import Button from '../../components/Button.svelte';
	import TextInput from '../../components/TextInput.svelte';

	let name = $state('');
	let stage = $state(0);

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div>
	<div class="flex items-center gap-4">
		<div>{stage >= 1 ? '●' : '○'}</div>
		<div>{stage >= 2 ? '●' : '○'}</div>
		<div>{stage >= 3 ? '●' : '○'}</div>
		<div>{stage >= 4 ? '●' : '○'}</div>
	</div>
	<span
		>{stage === 0
			? 'Name'
			: stage === 1
				? 'Dopamin'
				: stage === 2
					? 'Accomplishment'
					: stage === 3
						? 'Threshold'
						: 'social'}</span
	>
	{stage}

	<form method="POST">
		<TextInput
			name="name"
			type="text"
			bind:value={name}
			class={stage === 0 ? 'visible' : 'hidden'}
		/>
		<input type="number" name="dopamin" class={stage === 1 ? 'visible' : 'hidden'} />
		<input type="number" name="accomplishment" class={stage === 2 ? 'visible' : 'hidden'} />
		<input type="number" name="threshold" class={stage === 3 ? 'visible' : 'hidden'} />
		<input type="number" name="social" class={stage === 4 ? 'visible' : 'hidden'} />

		<Button
			type="button"
			onclick={() => {
				if (stage <= 0) {
				} else {
					stage--;
				}
			}}>{stage <= 0 ? 'Cancel' : 'Back'}</Button
		>
		<Button
			class={stage >= 4 ? 'hidden' : 'visible'}
			type={'button'}
			onclick={() => {
				stage++;
			}}>Next</Button
		>
		<Button class={stage >= 4 ? 'visible' : 'hidden'}>Create</Button>
	</form>
	<div>{form?.error}</div>
</div>
