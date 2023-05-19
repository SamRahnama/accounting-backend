import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    let page = ctx.request.qs().page
    const users = await Database.from('users').paginate(page, 8)
    return users.toJSON()
  }
  public async store() {
  }

  public async show() {
  }

  public async update() {
  }

  public async destroy() {
  }
}
