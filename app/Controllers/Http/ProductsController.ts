import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import CreateProductValidator from "App/Validators/CreateProductValidator"
// import Logger from "@ioc:Adonis/Core/Logger"
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'
import {bind} from '@adonisjs/route-model-binding'

export default class ProductsController {
  public async index({request}: HttpContextContract) {
    let page = request.qs().page
    let products = await Database.from('products').paginate(page, 8)
    return products.toJSON()
  }

  public async store({request}: HttpContextContract) {
    const data: any = await request.validate(CreateProductValidator)
    const product = await Product.create(data)
    try {
      if (data.categroies) {
        await product.related('categories').attach(data.categroies)
      }
      if (data.brand_id)
        await product.related('brand').associate(data.brand_id)
    } catch (e) {
      return e
    }
    return product
  }

  @bind()
  public async show({}, product: Product) {
    return product
  }

  @bind()
  public async update({request}: HttpContextContract, product: Product) {
    const payload: any = request.validate(UpdateProductValidator)
    await product.merge(payload).save()
    try {
      if (payload.categories)
        await product.related('categories').sync(payload.categories)
      if (payload.brand_id)
        await product.related('brand').associate(payload.brand_id)
    } catch (e) {
      return e
    }
    return product
  }

  public async destroy({}, product: Product) {
    await product.delete()
    return product
  }
}
