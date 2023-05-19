import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'loans'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('profit').unsigned().notNullable()
      table.integer('prepayment').unsigned()
      table.integer('loan_month').unsigned()

      // paid amount is not as same as prepayment, it will be calculated on remaining amount of money
      table.integer('paid_amount').unsigned()
      table.integer('payment_id').unsigned().references('payments.id').onDelete('CASCADE')
      table.timestamp('loan_start_date').defaultTo(this.now())
      table.timestamp('loan_end_date').defaultTo(this.now())
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
