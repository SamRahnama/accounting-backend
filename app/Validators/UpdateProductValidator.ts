import { schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({trim: true}),
    categories: schema.array.optional([rules.minLength(1)]).members(schema.number([rules.exists({
      table: 'categories',
      column: 'id'
    })])),
    quantity: schema.number.optional([rules.unsigned()]),
    description: schema.string.optional({trim: true}),
    brand_id: schema.number.optional([rules.exists({table: 'brands', column: 'id'})]),
  })

  public messages: CustomMessages = {}
}
