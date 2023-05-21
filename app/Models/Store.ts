import {DateTime} from 'luxon'
import {BaseModel, column, computed, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Store extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public name: string

  @manyToMany(() => Product, {
    pivotColumns: ['quantity', 'cost', 'price']
  })
  public products: ManyToMany<typeof Product>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @computed()
  public get cost() {
    return this.$extras.pivot_cost
  }

  @computed()
  public get price() {
    return this.$extras.pivot_price
  }

  @computed()
  public get quatity() {
    return this.$extras.pivot_quantity
  }
}
