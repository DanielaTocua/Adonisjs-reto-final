import { BaseModel,  column } from '@ioc:Adonis/Lucid/Orm'

export default class Question extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public question: string
  @column() public state: boolean
}
