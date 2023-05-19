import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Brand from 'App/Models/Brand'
import CreateBrandValidator from 'App/Validators/CreateBrandValidator'
import {schema, rules} from '@ioc:Adonis/Core/Validator'

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

  public async show({request}: HttpContextContract) {
    const id = request.params().id
    const brand = await Brand.findOrFail(id)
    return brand.toJSON()
  }

  public async update({request, params}: HttpContextContract) {
    const payload: any = request.validate({
      schema: schema.create({
        name: schema.string.optional([rules.trim()])
      })
    })
    const brand = await Brand.findOrFail(params.id)
    brand.merge(payload).save()
    return brand.toJSON()

  }
  public async destroy({params}: HttpContextContract) {
    const brand = await Brand.findOrFail(params.id)
    brand.delete()
    return brand
  }
}
