import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forms extends BaseSchema {
  protected tableName = 'forms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('student_id').unsigned()
      table.foreign('student_id').references('users.id').onDelete('cascade')

      table.integer('answer_id').unsigned()
      table.foreign('answer_id').references('answers.id').onDelete('cascade')      
      
      table.boolean('state').notNullable().defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
