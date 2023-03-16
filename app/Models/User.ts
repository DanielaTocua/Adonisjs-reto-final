import { BaseModel,  column} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column() public first_name: string
  @column() public second_name: string
  @column() public surname: string
  @column() public second_sur_name: string
  @column() public type_document: number
  @column() public document_number: number
  @column() public email: string
  @column() public password: string
  @column() public role_id: number
  @column() public phone: string
  @column() public state: boolean

}
