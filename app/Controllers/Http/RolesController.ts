import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Role from 'App/Models/Role'
import CreateRoleValidator from 'App/Validators/CreateRoleValidator'
import UpdateRoleValidator from 'App/Validators/UpdateRoleValidator'

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

  public async show({params}: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    return role
  }

  public async update({params, request}: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    const payload = await request.validate(UpdateRoleValidator)
    await role.merge(payload).save()
    return role
  }


  public async destroy({params}: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await role.delete()
    return role
  }
}

