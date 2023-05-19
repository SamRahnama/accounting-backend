import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {OrderTypes} from "App/Enums/order.enum";

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('type', Object.values(OrderTypes)).defaultTo(OrderTypes.SELL).notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('RESTRICT')
      table.integer('payment_id').unsigned().references('payments.id').onDelete('RESTRICT')
      table.integer('total_price').unsigned()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
