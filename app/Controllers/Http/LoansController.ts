import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Loan from 'App/Models/Loan'
import CreateLoanValidator from 'App/Validators/CreateLoanValidator'
import UpdateLoanValidator from 'App/Validators/UpdateLoanValidator'

export default class LoansController {
  public async index({request}: HttpContextContract) {
    let page = request.qs().page
    let payments = await Database.from('payments').paginate(page, 8)
    return payments
  }


  public async show({params}: HttpContextContract) {
    const loan = await Loan.findOrFail(params.id)
    await loan.load('payment')
    return loan
  }

  public async store({request}: HttpContextContract) {
    const payload = await request.validate(CreateLoanValidator)
    const loan = await Loan.create(payload)
    await loan.load('payment')
    return loan
  }

  public async update({params, request}: HttpContextContract) {
    const loan = await Loan.findOrFail(params.id)
    const payload = await request.validate(UpdateLoanValidator)
    await loan.merge(payload).save()
    return loan
  }

  public async destroy({params}: HttpContextContract) {
    const loan = await Loan.findOrFail(params.id)
    await loan.delete()
    return loan
  }
}
