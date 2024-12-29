import { db } from '$lib/server';
import { activitiesTable } from '$lib/server/schema';
import { eq, ne } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_KEY } from '$env/static/private';
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

	const otherActivitiesString = otherActivities.map((a) => a.name);

	const anthropic = new Anthropic({
		apiKey: ANTHROPIC_KEY
	});

	const msg = await anthropic.messages.create({
		model: 'claude-3-haiku-20240307',
		max_tokens: 255,
		messages: [
			{
				role: 'user',
				content:
					'I want to get help with suggesting another activity than the one i was about to do. The activity I wanted to do was ' +
					activityResult[0].name +
					'. My other activities that I usually do are ' +
					otherActivitiesString.join(', ') +
					'. You can also suggest another activity that are similar. Choose an activity that is better than the activity that i wanted to do. You CAN only return a json format that looks like json: {name: String, reason: String}'
			}
		]
	});

	const suggestion = otherActivities[randomNumber];

	console.log(msg);

	return {
		activity: activityResult[0],
		suggestion: JSON.parse(msg.content.toString())
	};
};
