import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PaymentTypes } from 'App/Enums/payments.enum'

export default class UpdatePaymentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.enum.optional(Object.values(PaymentTypes)),
    paid_amount: schema.number.optional(),
    discount: schema.number.optional([rules.unsigned()]),
    total: schema.number.optional([rules.unsigned()])
  })

  public messages: CustomMessages = {}
}
