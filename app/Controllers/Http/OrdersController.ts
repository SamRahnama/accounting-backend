import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Order from 'App/Models/Order'
import CreateOrderValidator from 'App/Validators/CreateOrderValidator'
import Logger from '@ioc:Adonis/Core/Logger'
import UpdateOrderValidator from 'App/Validators/UpdateOrderValidator'
import {bind} from '@adonisjs/route-model-binding'

export default class OrdersController {
  public async index({request}: HttpContextContract) {
    let page = request.qs().page
    let orders = await Database.from('orders').paginate(page, 8)
    return orders
  }

  public async store({request}: HttpContextContract) {
    const payload: any = await request.validate(CreateOrderValidator)
    const order = await Order.create(payload)
    try {
      if (payload.products)
        await order.related('products').attach(payload.products)
      if (payload.payment_id)
        await order.related('payment').associate(payload.payment_id)
      await order.load('products')
    } catch (e) {
      Logger.error(e)
    }
    return order
  }

  @bind()
  public async show({}, order: Order) {
    await order.load('products')
    return order
  }

  @bind()
  public async update({request}: HttpContextContract, order: Order) {
    let payload: any = await request.validate(UpdateOrderValidator)
    order.merge(payload)
    try {
      if (payload.products)
        await order.related('products').attach(payload.products)
      if (payload.payment_id)
        await order.related('payment').associate(payload.payment_id)
      await order.load('products')
    } catch (e) {
      Logger.error(e)
    }
    return order
  }

  @bind()
  public async destroy({}, order: Order) {
    await order.delete()
    return order
  }
}
