import { BaseModel,  HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public question: string
  @column() public state: boolean


  
  @hasMany(()=> Answer,{
    localKey:'id',
    foreignKey:'question_id',
  })
  public options: HasMany<typeof Answer>


}

