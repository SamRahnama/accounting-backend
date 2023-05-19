import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description')
      table.integer('quantity').unsigned()
      table.integer('brand_id').unsigned().references('brands.id').onDelete('CASCADE')
      table.timestamps(true,true)

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
