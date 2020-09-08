import * as Knex from 'knex'

declare module 'knex' {
  interface QueryBuilder {
    announcementsViewableBy<TRecord, TResult>(value: number): Knex.QueryBuilder<TRecord, TResult>;
  }
}
