import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DiscountTypes } from 'App/Enums/discounts';
import { PaymentTypes } from "App/Enums/payments.enum";

export default class extends BaseSchema {
  protected tableName = 'payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('type', Object.values(PaymentTypes)).defaultTo(PaymentTypes.CASH).notNullable()
      table.integer('paid_amount').unsigned()
      table.float('discount').unsigned()
      table.enum('discount_type', Object.values(DiscountTypes))
      table.integer('total').unsigned()
      table.timestamps(true, true)

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
