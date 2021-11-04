import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')

      table
        .integer('product_category_id')
        .unsigned()
        .references('product_categories.id')
        .onDelete('CASCADE')

        table
        .integer('product_sub_category_id')
        .unsigned()
        .references('product_sub_categories.id')
        .onDelete('CASCADE')

        table.string('title', 255).notNullable()

        table.string('description', 255).notNullable()

        table.float('price', 255).notNullable()

        table.timestamps(true, true)

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
