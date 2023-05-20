import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    first_name: schema.string.optional(),
    last_name: schema.string.optional(),
    email: schema.string.optional([rules.email()]),
    password: schema.string.optional([rules.minLength(8)]),
    phone_number: schema.string.optional()
  })

  public messages: CustomMessages = {}
}
