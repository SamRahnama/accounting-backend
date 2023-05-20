import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Brand from 'App/Models/Brand'
import CreateBrandValidator from 'App/Validators/CreateBrandValidator'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import {bind} from '@adonisjs/route-model-binding'

export default class BrandsController {
  public async index({request}: HttpContextContract) {
    let page = request.qs().page
    let brands = await Database.from('brands').paginate(page, 8)
    return brands.toJSON()
  }

  public async store({request}: HttpContextContract) {
    const payload: any = await request.validate(CreateBrandValidator)
    const brand = await Brand.create(payload)
    return brand.toJSON()
  }

  @bind()
  public async show({}, brand: Brand) {
    return brand.toJSON()
  }

  @bind()
  public async update({request}: HttpContextContract, brand: Brand) {
    const payload: any = request.validate({
      schema: schema.create({
        name: schema.string.optional([rules.trim()])
      })
    })
    brand.merge(payload).save()
    return brand.toJSON()

  }

  @bind()
  public async destroy({}, brand: Brand) {
    await brand.delete()
    return brand
  }
}
