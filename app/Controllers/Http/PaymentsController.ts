import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Payment from 'App/Models/Payment'
import CreatePaymentValidator from 'App/Validators/CreatePaymentValidator'
import UpdatePaymentValidator from 'App/Validators/UpdatePaymentValidator'

export default class PaymentsController {

  public async index({request}: HttpContextContract) {
    let page = request.qs().page
    let payments = await Database.from('payments').paginate(page, 8)
    return payments
  }

  public async store({request}: HttpContextContract) {
    const params: any = await request.validate(CreatePaymentValidator)
    const payment = await Payment.create(params)
    return payment
  }

  public async show({params}: HttpContextContract) {
    const payment = await Payment.findOrFail(params.id)
    payment.load('loan')
    return payment
  }

  public async update({params, request}: HttpContextContract) {
    const payment = await Payment.findOrFail(params.id)
    const payload = await request.validate(UpdatePaymentValidator)
    payment.merge(payload)
    return payment
  }

  public async destroy({params}: HttpContextContract) {
    const payment = await Payment.findOrFail(params.id)
    payment.delete()
    return payment
  }
}
