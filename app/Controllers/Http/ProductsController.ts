import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import CreateProductValidator from "App/Validators/CreateProductValidator"
// import Logger from "@ioc:Adonis/Core/Logger"
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'

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
        product.related('categories').attach(data.categroies)
      }
      if (data.brand_id)
        product.related('brand').associate(data.brand_id)
    } catch (e) {
      return e
    }
    return product
  }

  public async show({request}: HttpContextContract) {
    const id = request.params().id
    const product = await Product.findOrFail(id)
    return product.toJSON()
  }

  public async update({request}: HttpContextContract) {
    let id = request.params().id
    const payload: any = request.validate(UpdateProductValidator)
    const product = await Product.findOrFail(id)
    product.merge(payload).save()
    try {
      if (payload.categories)
        product.related('categories').sync(payload.categories)
      if (payload.brand_id)
        product.related('brand').associate(payload.brand_id)
    } catch (e) {
      return e
    }
    return product
  }

  public async destroy({params}: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    product.delete()
    return product
  }
}
