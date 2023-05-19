import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { OrderTypes } from 'App/Enums/order.enum'

export default class UpdateOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.enum.optional(Object.values(OrderTypes)),
    total_price: schema.number.optional([rules.unsigned()]),
    user_id: schema.number.optional([rules.exists({column: 'id', table: 'users'})]),
    payment_id: schema.number.optional([rules.exists({column: 'id', table: 'payments'})]),
    products: schema.object.optional().anyMembers()
  })


  public messages: CustomMessages = {}
}
