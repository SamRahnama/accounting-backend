import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    name: schema.string({trim: true}),
    categories: schema.array.optional([rules.minLength(1)]).members(schema.number([rules.exists({
      table: 'categories',
      column: 'id'
    })])),
    quantity: schema.number([rules.unsigned()]),
    cost: schema.number([rules.unsigned()]),
    price: schema.number([rules.unsigned()]),
    description: schema.string.optional({trim: true}),
    brand_id: schema.number.optional([rules.exists({table: 'brands', column: 'id'})]),
  })


  public messages: CustomMessages = {
    required: "{{ field }} is required",
  }
}
