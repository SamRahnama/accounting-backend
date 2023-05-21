import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, computed, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Brand from "App/Models/Brand";
import Category from './Category';
import Order from './Order';
import Store from './Store';

export default class Product extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public quantity: string

  @column()
  public brandId: number

  @belongsTo(() => Brand)
  public brand: BelongsTo<typeof Brand>

  @manyToMany(() => Category)
  public categories: ManyToMany<typeof Category>

  @manyToMany(() => Store, {
    pivotColumns: ['quantity', 'cost', 'price']
  })
  public stores: ManyToMany<typeof Store>

  @manyToMany(() => Order, {
    pivotColumns: ['price', 'number'],
    pivotForeignKey: 'product_id',
    pivotRelatedForeignKey: 'order_id',
    pivotTable: 'order_product'
  })
  public orders: ManyToMany<typeof Order>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  // returns how many products are inside of its order
  @computed()
  public get productNumber() {
    return this.$extras.pivot_number
  }

  // returns order's product's price
  @computed()
  public get price() {
    return this.$extras.pivot_price
  }
}
