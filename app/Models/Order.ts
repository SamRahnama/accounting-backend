import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, computed, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import {OrderTypes} from "App/Enums/order.enum";
import User from "App/Models/User";
import Product from "App/Models/Product";
import Payment from "App/Models/Payment";

export default class Order extends BaseModel {

  @column({isPrimary: true})
  public id: number

  @column()
  public type: OrderTypes

  @column()
  public totalPrice: number

  @column()
  public userId: number

  @column()
  public paymentId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Payment)
  public payment: BelongsTo<typeof Payment>

  @manyToMany(() => Product, {
    pivotColumns: ['price','number', 'created_at', 'updated_at'],
    pivotTable: 'order_product',
    pivotForeignKey: 'order_id',
    pivotRelatedForeignKey: 'product_id'
  })
  public products: ManyToMany<typeof Product>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @computed()
  public get productNumber() {
    return  this.$extras.pivot_number
  }
  @computed()
  public get productPrice() {
    return  this.$extras.pivot_price
  }
}
