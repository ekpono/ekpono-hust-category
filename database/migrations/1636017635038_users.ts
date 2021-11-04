import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.string('username', 255).notNullable()
      table.string('type', 180).defaultTo('admin')
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.enum('gender', ['male', 'female']).notNullable()
      table.string('contact_number', 255).notNullable()
      table.string('address', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
