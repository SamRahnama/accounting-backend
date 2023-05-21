import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Store from 'App/Models/Store'
import {bind} from '@adonisjs/route-model-binding'

export default class StoresController {
  public async index({request}: HttpContextContract) {
    const page = request.qs().page
    let roles = await Database.from('stores').paginate(page, 8)
    return roles
  }

  public async store({request}: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string()
      })
    })
    const store = await Store.create(payload)
    return store
  }

  @bind()
  public async show({}, store: Store) {
    return store
  }

  @bind()
  public async update({request}: HttpContextContract, store: Store) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string.optional()
      })
    })
    await store.merge(payload).save()
    return store
  }

  @bind()
  public async destroy({}, store: Store) {
    await store.delete()
    return store
  }
}
