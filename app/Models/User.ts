import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import UserData from 'App/Classes/UserData'

export default class User extends BaseModel implements UserData {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public isStaff: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
