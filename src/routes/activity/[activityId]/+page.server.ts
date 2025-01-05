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

	const content = `You are an AI assistant designed to suggest alternative activities for users. Your task is to recommend an activity that is better than the one the user initially planned to do. Here's the information you have: 
	1. The activity the user was planning to do:
	<planned_activity>
	${activityResult[0].name}
	</planned_activity>
	
	2. A list of the user's usual activities:
	<usual_activities>
	${otherActivitiesString.join(', ')}
	</usual_activities>
	
	Instructions:
	1. Consider the user's planned activity and their usual activities.
	2. Choose one of the users activities that you think is better than the one the user initially planned.
	3. Provide a brief reason for your suggestion.
	4. Format your response as a JSON object with two fields: "name" (the suggested activity) and "reason" (the explanation for your suggestion).
	
	Example of the required JSON format:
	{
	  "name": "Example Activity",
	  "reason": "Brief explanation for suggesting this activity"
	}
	
	Please proceed with your suggestion.`;

	// 2. Think of alternative activities, including those similar to the user's usual activities.
	// 'I want to get help with suggesting another activity than the one i was about to do. The activity I wanted to do was ' +
	// activityResult[0].name +
	// '. My other activities that I usually do are ' +
	// otherActivitiesString.join(', ') +
	// '. You can also suggest another activity that are similar. Choose an activity that is better than the activity that i wanted to do. The output is only allowed to be a json format {name: String, reason: String}';

	console.log(content);

	// const msg = await anthropic.messages.create({
	// 	model: 'claude-3-haiku-20240307',
	// 	max_tokens: 400,
	// 	messages: [
	// 		{
	// 			role: 'user',
	// 			content: content
	// 		}
	// 	]
	// });

	const msg = {
		id: 'msg_017bhEw2p4M16jgmYcxEthPT',
		type: 'message',
		role: 'assistant',
		model: 'claude-3-haiku-20240307',
		content: [
			{
				type: 'text',
				text:
					'{\n' +
					'  "name": "Gym",\n' +
					`  "reason": "Going to the gym would be a better activity than playing computer games as it would provide physical exercise, which is important for overall health and well-being. Additionally, it would be a change from the user's usual sedentary activities like gaming and using social media."\n` +
					'}'
			}
		],
		stop_reason: 'end_turn',
		stop_sequence: null,
		usage: {
			input_tokens: 267,
			cache_creation_input_tokens: 0,
			cache_read_input_tokens: 0,
			output_tokens: 75
		}
	};

	const suggestion = otherActivities[randomNumber];

	console.log(msg);

	return {
		activity: activityResult[0],
		suggestion: JSON.parse(
			msg.content[0].type === 'text'
				? msg.content[0].text
				: '{"name" : "no contenten", reason: "No text response"}'
		)
	};
};
