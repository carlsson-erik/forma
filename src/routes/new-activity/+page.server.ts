import { db } from '$lib/server';
import { activitiesTable } from '$lib/server/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');

		if (!name) return fail(403, { error: 'No name provided' });
		console.log(name.toString());

		const newActivity = await db
			.insert(activitiesTable)
			.values({ name: name.toString() })
			.returning();
		redirect(303, `activity/${newActivity[0].id}`);
	}
} satisfies Actions;
