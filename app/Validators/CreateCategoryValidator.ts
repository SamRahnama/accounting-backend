import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.trim()]),
    category_id: schema.number.optional([rules.exists({table:'categories',column:'id'})])
  })

  public messages: CustomMessages = {}
}
