import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string([rules.minLength(8)]),
    remember_me: schema.boolean.optional()
  })

  public messages: CustomMessages = {}
}
