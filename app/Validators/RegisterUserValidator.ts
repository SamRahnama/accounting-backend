import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    first_name: schema.string(),
    last_name: schema.string(),
    email: schema.string([rules.email()]),
    password: schema.string([rules.minLength(8)]),
    phone_number: schema.string.optional()
  })


  public messages: CustomMessages = {}
}
