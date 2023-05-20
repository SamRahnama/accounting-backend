import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Role from 'App/Models/Role'
import CreateRoleValidator from 'App/Validators/CreateRoleValidator'
import UpdateRoleValidator from 'App/Validators/UpdateRoleValidator'
import {bind} from '@adonisjs/route-model-binding'

export default class RolesController {
  public async index({request}: HttpContextContract) {
    let page = request.qs().page
    let roles = await Database.from('roles').paginate(page, 8)
    return roles.toJSON()
  }

  public async store({request}: HttpContextContract) {
    const payload = await request.validate(CreateRoleValidator)
    const role = await Role.create(payload)
    return role
  }

  @bind()
  public async show({}, role: Role) {
    return role
  }

  @bind()
  public async update({request}: HttpContextContract, role: Role) {
    const payload = await request.validate(UpdateRoleValidator)
    await role.merge(payload).save()
    return role
  }


  @bind()
  public async destroy({}, role: Role) {
    await role.delete()
    return role
  }
}

