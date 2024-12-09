import { db } from '$lib/server';
import { activitiesTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const activities = await db.select().from(activitiesTable);

	return {
		activities
	};
};

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();

		if (!id) return fail(403, { error: `No activity with id ${id}` });

		await db.delete(activitiesTable).where(eq(activitiesTable.id, Number(id)));
	}
} satisfies Actions;
