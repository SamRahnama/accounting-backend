import {DateTime} from 'luxon'
import {BaseModel, column, computed, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import {PaymentTypes} from "App/Enums/payments.enum";
import Loan from './Loan';

export default class Payment extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public type: PaymentTypes

  @column()
  public discount: number

  @column()
  public total: number

  @column()
  public paymentDone: Boolean

  @column()
  public paidAmount: number

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @hasOne(() => Loan)
  public loan: HasOne<typeof Loan>

  @computed()
  public get isDone() {
    return this.paidAmount >= this.total
  }
}
