import {DateTime} from 'luxon'
import {BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";

export default class Brand extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public name: string

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}
