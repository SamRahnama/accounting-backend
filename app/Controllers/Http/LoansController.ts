import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Loan from 'App/Models/Loan'
import CreateLoanValidator from 'App/Validators/CreateLoanValidator'
import UpdateLoanValidator from 'App/Validators/UpdateLoanValidator'
import {bind} from '@adonisjs/route-model-binding'

export default class LoansController {
  public async index({request}: HttpContextContract) {
    let page = request.qs().page
    let payments = await Database.from('payments').paginate(page, 8)
    return payments
  }


  public async store({request}: HttpContextContract) {
    const payload = await request.validate(CreateLoanValidator)
    const loan = await Loan.create(payload)
    await loan.load('payment')
    return loan
  }

  @bind()
  public async show({}, loan: Loan) {
    await loan.load('payment')
    return loan
  }

  @bind()
  public async update({request}: HttpContextContract, loan: Loan) {
    const payload = await request.validate(UpdateLoanValidator)
    await loan.merge(payload).save()
    return loan
  }

  @bind()
  public async destroy({}, loan: Loan) {
    await loan.delete()
    return loan
  }
}
