import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class CreateLoanValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    loan_month: schema.number([rules.unsigned()]),
    prepayment: schema.number([rules.unsigned()]),
    paid_amount: schema.number.optional([rules.unsigned()]),
    payment_id: schema.number([
      rules.exists({
        column: 'id',
        table: 'payments'
      }),
      rules.onlyOnLoanPayment(),
      rules.unique({table: 'loans', column: 'payment_id'})
    ]),
    profit: schema.number([rules.range(0, 100)]),
    loan_start_date: schema.date.optional(),
    loan_end_date: schema.date.optional()
  })

  public messages: CustomMessages = {}
}
