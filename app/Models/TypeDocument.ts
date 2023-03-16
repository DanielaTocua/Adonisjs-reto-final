import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class TypeDocument extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public name: string
  @column() public state: boolean

  @hasMany(()=> User,{
    localKey:'id',
    foreignKey:'type_document',
  })
  public profile: HasMany<typeof User>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
