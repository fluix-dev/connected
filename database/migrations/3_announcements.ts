import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Announcements extends BaseSchema {
  protected tableName = 'announcements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('excerpt').notNullable()
      table.string('raw').notNullable()
      table.date('date').notNullable()

      table.integer('club_id').references('id').inTable('clubs').notNullable()

      table.integer('author_id').references('id').inTable('users').notNullable()
      table.integer('approver_id').references('id').inTable('users')

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
