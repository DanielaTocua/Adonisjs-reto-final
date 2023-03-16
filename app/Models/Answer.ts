import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Answer extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public answer: string
  @column() public is_correct: boolean

  @column() public question_id: number
  @column() public state: boolean

}
