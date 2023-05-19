import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public name: string

  @column()
  public parent_id: number

  @belongsTo(() => Category, {
    foreignKey: 'parent_id'
  })
  public parent: BelongsTo<typeof Category>

  @hasMany(() => Category, {
    foreignKey: 'parent_id'
  })
  public children: HasMany<typeof Category>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}
