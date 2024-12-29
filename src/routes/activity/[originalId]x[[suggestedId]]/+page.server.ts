import { db } from '$lib/server';
import { activitiesTable } from '$lib/server/schema';
import { eq, ne, gte, and, lte } from 'drizzle-orm';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { ActivityType } from '../../../types/activity';
import type { PgColumn } from 'drizzle-orm/pg-core';
import type { PageServerLoad } from './$types';
import { safeNumber } from '../../../utils/formUtils';

const suggestActivity = async (activityId: number, type?: ActivityType) => {
	const activity = (
		await db
			.select()
			.from(activitiesTable)
			.where(eq(activitiesTable.id, Number(activityId)))
	)?.[0];
	console.log('123', activityId, type, activity);
	if (!activity) return;

	let filter = gte(activitiesTable.grade, activity.grade);
	let orderBy: PgColumn = activitiesTable.grade;
	switch (type) {
		case 'accomplishment':
			filter = gte(activitiesTable.accomplishment, activity.accomplishment);
			orderBy = activitiesTable.accomplishment;
			break;
		case 'dopamine':
			filter = gte(activitiesTable.dopamine, activity.dopamine);
			orderBy = activitiesTable.dopamine;
			break;
		case 'social':
			filter = lte(activitiesTable.social, activity.social);
			orderBy = activitiesTable.social;
			break;
		case 'threshold':
			filter = lte(activitiesTable.threshold, activity.threshold);
			orderBy = activitiesTable.threshold;
			break;
	}

	const otherActivities = await db
		.select()
		.from(activitiesTable)
		.where(and(ne(activitiesTable.id, Number(activityId)), filter))
		.orderBy(activitiesTable.grade);

	// const ran = Math.floor(Math.random() * otherActivities.length);

	const suggestion = otherActivities[0];

	return suggestion;
};

export const load: PageServerLoad = async ({ params }) => {
	const activity = await db
		.select()
		.from(activitiesTable)
		.where(eq(activitiesTable.id, Number(params.originalId)));
	console.log('#########################', params);

	const suggestion = params.suggestedId
		? (
				await db
					.select()
					.from(activitiesTable)
					.where(eq(activitiesTable.id, Number(params.suggestedId)))
			)?.[0]
		: await suggestActivity(Number(params.originalId));

	if (!params.suggestedId && suggestion)
		return redirect(303, `${params.originalId}x${suggestion?.id}`);

	if (!suggestion) fail(404);

	return {
		activity: activity[0],
		suggestion: suggestion
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const originalId = safeNumber(data.get('originalId'));
		const suggestedId = safeNumber(data.get('suggestedId'));
		const type = data.get('type') as ActivityType | undefined;
		if (!type || !originalId) return fail(303);

		console.log('###########222#########', suggestedId);

		const suggestion = await suggestActivity(suggestedId ?? originalId, type);
		console.log('Tried to redirect to ', suggestion);
		if (!suggestion) return fail(404);
		console.log(suggestion, suggestedId, originalId);

		return redirect(303, `${originalId}x${suggestion.id ?? suggestedId ?? originalId}`);
	}
} satisfies Actions;
