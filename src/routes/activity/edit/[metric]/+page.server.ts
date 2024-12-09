import { db } from '$lib/server';
import { activitiesTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import type { ActivityType } from '../../../../types/activity';
import type { Actions, PageServerLoad } from './$types';
import { desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const activities = await db.query.activitiesTable.findMany({
		orderBy: desc(activitiesTable.dopamine)
	});
	return { activities };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const type = data.get('type') as ActivityType | undefined;
		const value = data.get('value');
		console.log(type, value, id);
		if (!type || value == null || id == null) return fail(303);

		switch (type) {
			case 'accomplishment':
				console.log(0);
				await db
					.update(activitiesTable)
					.set({ accomplishment: Number(value) })
					.where(eq(activitiesTable.id, Number(id)));
				break;
			case 'dopamine':
				console.log(1);
				await db
					.update(activitiesTable)
					.set({ dopamine: Number(value) })
					.where(eq(activitiesTable.id, Number(id)));
				break;
			case 'social':
				console.log(2);
				await db
					.update(activitiesTable)
					.set({ social: Number(value) })
					.where(eq(activitiesTable.id, Number(id)));
				break;
			case 'threshold':
				console.log(3);
				await db
					.update(activitiesTable)
					.set({ threshold: Number(value) })
					.where(eq(activitiesTable.id, Number(id)));
				break;
		}
	}
} satisfies Actions;
