import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  /**
   * @virk
   * Let's keep everything in camelCase in our codebase
   */
  @column()
  public isCompleted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * @virk
   * The follows statement makes sure that `Task.create` method
   * should only allow the following properties.
   */
  public static $columns: Pick<
    Task,
    'id' | 'createdAt' | 'updatedAt' | 'title' | 'isCompleted'
  >
}
