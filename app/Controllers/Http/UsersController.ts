import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";
import User from 'App/Models/User';
import RegisterUserValidator from 'App/Validators/RegisterUserValidator';
import UpdateUserValidator from 'App/Validators/UpdateUserValidator';
import { bind } from '@adonisjs/route-model-binding'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    let page = ctx.request.qs().page
    const users = await Database.from('users').paginate(page, 8)
    return users.toJSON()
  }

  public async store({request}: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator)
    const user = await User.create(payload)
    return user
  }

  @bind()
  public async show({}, user: User) {
    return user
  }

  @bind()
  public async update({request}: HttpContextContract, user: User) {
    const payload = await request.validate(UpdateUserValidator)
    await user.merge(payload).save()
    return user
  }

  @bind()
  public async destroy({}, user: User) {
    await user.delete()
    return user
  }
}
