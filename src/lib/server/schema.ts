import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar, foreignKey } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	age: integer().notNull(),
	email: varchar({ length: 255 }).notNull().unique()
});

export const activitiesTable = pgTable('activites', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer('user_id'),
	name: varchar({ length: 255 }).notNull(),
	threshold: integer().default(0),
	dopamine: integer().default(0),
	social: integer().default(0),
	accomplishment: integer().default(0)
});

export const userRelations = relations(usersTable, ({ many }) => ({
	activities: many(activitiesTable)
}));

export const activityRelations = relations(activitiesTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [activitiesTable.userId],
		references: [usersTable.id]
	})
}));
