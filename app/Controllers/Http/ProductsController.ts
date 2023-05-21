import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import CreateProductValidator from "App/Validators/CreateProductValidator"
// import Logger from "@ioc:Adonis/Core/Logger"
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'
import {bind} from '@adonisjs/route-model-binding'
import Store from 'App/Models/Store'

export default class ProductsController {
  public async index({request}: HttpContextContract) {
    let page = request.qs().page
    let products = await Database.from('products').paginate(page, 8)
    return products.toJSON()
  }


  @bind()
  public async storeOnStorage({request}: HttpContextContract, store: Store) {
    const data: any = await request.validate(CreateProductValidator)
    const {quantity, cost, price}: { quantity: number, cost: number, price: number } = data
    let storageData = {}
    storageData[store.id] = {
      quantity, cost, price
    }
    delete data.cost
    delete data.price
    delete data.quantity
    const product = await Product.create(data)
    try {
      if (data.categroies) {
        await product.related('categories').attach(data.categroies)
      }
      if (store)
        await product.related('stores').attach(storageData)
    } catch (e) {
      console.log(e)
      return e
    }
    return product
  }

  @bind()
  public async show({}, product: Product) {
    await product.load(preloader => {
      preloader.load('stores').load('brand').load('categories')
    })
    return product
  }

  @bind()
  public async update({request}: HttpContextContract, product: Product, store: Store) {
    const payload: any = await request.validate(UpdateProductValidator)
    const {quantity, cost, price}: { quantity: number, cost: number, price: number } = payload
    let storageData = {}
    storageData[store.id] = {
      quantity, cost, price
    }
    delete payload.cost
    delete payload.price
    delete payload.quantity
    await product.merge(payload).save()
    try {
      if (payload.categories)
        await product.related('categories').sync(payload.categories)
      if (store)
        await product.related('stores').attach(storageData)
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
