import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Form extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public student_id: number
  @column() public answer_id: number

  @column() public state: boolean


}
