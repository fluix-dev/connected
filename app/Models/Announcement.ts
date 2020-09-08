import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import UserData from 'App/Classes/UserData'
import Club from 'App/Models/Club'

export default class Announcement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public clubId: number

  @belongsTo(() => Club)
  public club: BelongsTo<typeof Club>

  @column()
  public raw: string

  @column()
  public description: string

  @column()
  public excerpt: string

  @column.date()
  public date: DateTime

  @column()
  public authorId: number

  @belongsTo(() => User, {
    foreignKey: 'authorId',
  })
  public author: BelongsTo<typeof User>

  @column()
  public approverId: number

  @belongsTo(() => User, {
    foreignKey: 'approverId',
  })
  public approver: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static filterViewableBy (query, user: UserData) {
    if (user.isStaff) {
      return query
    }
    return query.andWhere(q => {
      return q
        .whereNotNull('approver_id')
        .orWhere('author_id', user.id)
    })
  }

  public static filterList (query) {
    return query
      .select(['id', 'authorId', 'approverId', 'clubId', 'title', 'excerpt', 'date'])
      .preload('club')
  }

  public isViewableBy (user: UserData) {
    // staff members can view all
    // authors can view the ones they have made
    // approved announcements can be viewed by all
    return this.approverId || this.authorId === user.id || user.isStaff
  }

  public isEditableBy (user: UserData) {
    // only staff members or author can edit
    // non-staff authors cannot edit after being approved
    return user.isStaff || (this.authorId === user.id && !this.approverId)
  }
}
