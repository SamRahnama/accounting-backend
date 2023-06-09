import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    name: schema.string.optional([rules.trim()]),
    parent_id: schema.number.optional([rules.exists({table: 'categories', column: 'id'})])
  })

  public messages: CustomMessages = {}
}
