import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_product'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('product_store.product_id').onDelete('RESTRICT')
      table.integer('number').unsigned()
      table.integer('price').unsigned()
      table.timestamps(true,true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
