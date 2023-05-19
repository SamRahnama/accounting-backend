import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Payment from './Payment'

export default class Loan extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public loanMonth: number

  @column()
  public prepayment: number

  @column()
  public paidAmount: number

  @column()
  public paymentId: number

  @column()
  public profit: number

  @belongsTo(() => Payment)
  public payment: BelongsTo<typeof Payment>

  @column.dateTime({autoCreate: false})
  public loanStartDate: DateTime

  @column.dateTime({autoCreate: false})
  public loanEndDate: DateTime

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}
