import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name',100).notNullable()
      table.string('second_name',100)
      table.string('surname',100).notNullable()
      table.string('second_sur_name',100).notNullable()

      table.integer('type_document').unsigned()
      table.foreign('type_document').references('types_documents.id').onDelete('cascade')

      table.integer('document_number').unsigned()
      table.string('email',100)
      table.string('password',100)

      table.integer('role_id').unsigned()
      table.foreign('role_id').references('roles.id').onDelete('cascade')

      table.string('phone',100)
      table.boolean('state').notNullable().defaultTo(true)

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
