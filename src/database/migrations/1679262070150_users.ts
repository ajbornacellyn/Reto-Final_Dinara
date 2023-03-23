import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name').notNullable()
      table.string('second_name').notNullable()
      table.string('surname').notNullable()
      table.string('second_surname').notNullable()
      table.string('email').notNullable().unique()
      table.integer('type_document').references('id').inTable('types_documents')
      table.string('document_number').notNullable().unique()
      table.string('password').notNullable()
      table.integer('rol_id').references('id').inTable('roles')
      table.string('phone').notNullable()
      table.boolean('state').notNullable().defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
