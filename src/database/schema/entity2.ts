import * as t from 'drizzle-orm/pg-core';

import { commons } from '../helper';

import { Entity1Table } from '.';

export const Entity2Table = t.pgTable('entity2', {
   ...commons,
   name: t.text().notNull(),
   entity1Id: t
      .integer()
      .notNull()
      .references(() => Entity1Table.id),
});
