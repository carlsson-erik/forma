import { db } from '$lib/server';
import { activitiesTable } from '$lib/server/schema';
import { eq, ne } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const activityResult = await db
		.select()
		.from(activitiesTable)
		.where(eq(activitiesTable.id, Number(params.activityId)));

	const otherActivities = await db
		.select()
		.from(activitiesTable)
		.where(ne(activitiesTable.id, Number(params.activityId)));

	const randomNumber = Math.floor(Math.random() * otherActivities.length);
	console.log(randomNumber);

	const suggestion = otherActivities[randomNumber];

	return {
		activity: activityResult[0],
		suggestion: suggestion
	};
};
