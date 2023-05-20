import {schema, CustomMessages} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class UpdateRoleValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    name: schema.string.optional(),
    label: schema.string.optional()
  })

  public messages: CustomMessages = {}
}
