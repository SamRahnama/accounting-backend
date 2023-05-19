import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {OrderTypes} from 'App/Enums/order.enum'

export default class CreateOrderValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    type: schema.enum(Object.values(OrderTypes)),
    total_price: schema.number([rules.unsigned()]),
    user_id: schema.number([rules.exists({column: 'id', table: 'users'})]),
    payment_id: schema.number.optional([rules.exists({column: 'id', table: 'payments'})]),
    products: schema.object().anyMembers()
  })

  public messages: CustomMessages = {}
}
