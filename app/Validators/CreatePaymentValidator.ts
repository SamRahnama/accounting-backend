import {schema, rules, CustomMessages} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {PaymentTypes} from 'App/Enums/payments.enum'
import {DiscountTypes} from 'App/Enums/discounts'

export default class CreatePaymentValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    type: schema.enum(Object.values(PaymentTypes)),
    paid_amount: schema.number.optional(),
    discount: schema.number.optional([rules.unsigned()]),
    discount_type: schema.enum.optional(Object.values(DiscountTypes), [rules.requiredIfExists('discount')]),
    total: schema.number([rules.unsigned()])
  })


  public messages: CustomMessages = {}
}
