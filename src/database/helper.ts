import { serial, timestamp } from 'drizzle-orm/pg-core';

export const commons = {
   id: serial().primaryKey(),
   updatedAt: timestamp(),
   createdAt: timestamp().defaultNow().notNull(),
   deletedAt: timestamp(),
};
