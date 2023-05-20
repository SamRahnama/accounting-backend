import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import {DiscountTypes} from 'App/Enums/discounts'
import Payment from 'App/Models/Payment'
import CreatePaymentValidator from 'App/Validators/CreatePaymentValidator'
import UpdatePaymentValidator from 'App/Validators/UpdatePaymentValidator'
import {bind} from '@adonisjs/route-model-binding'

export default class PaymentsController {

  public async index({request}: HttpContextContract) {
    let page = request.qs().page
    let payments = await Database.from('payments').paginate(page, 8)
    return payments
  }

  public async store({request}: HttpContextContract) {
    const params: any = await request.validate(CreatePaymentValidator)
    if (params.discount) {
      if (params.discount_type == DiscountTypes.PERCENTAGE)
        params.total = params.total - (params.total * (params.discount / 100))
      else
        params.total = params.total - params.discount
    }
    const payment = await Payment.create(params)
    return payment
  }

  @bind()
  public async show({}, payment: Payment) {
    await payment.load('loan')
    return payment
  }

  @bind()
  public async update({request}: HttpContextContract, payment: Payment) {
    const payload = await request.validate(UpdatePaymentValidator)
    await payment.merge(payload).save()
    return payment
  }

  @bind()
  public async destroy({}, payment: Payment) {
    await payment.delete()
    return payment
  }
}
