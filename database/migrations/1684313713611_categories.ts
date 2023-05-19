import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('parent_id').unsigned().references('categories.id').onDelete('CASCADE')
      table.timestamps(true,true)

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
