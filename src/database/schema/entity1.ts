import * as t from 'drizzle-orm/pg-core';

import { commons } from '../helper';

export const Entity1Table = t.pgTable('entity1', {
   ...commons,
   name: t.text().notNull(),
   number: t.integer(),
});
