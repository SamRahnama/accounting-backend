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
  public get extra() {
    return this.$extras.pivot_cost
  }
}
