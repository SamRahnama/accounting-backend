import {DateTime} from 'luxon'
import {BaseModel, beforeSave, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Role from './Role'

export default class User extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column()
  public phoneNumber: string

  @column({serializeAs: null})
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}
