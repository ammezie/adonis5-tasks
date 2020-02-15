import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tasks extends BaseSchema {
  protected $tableName = 'tasks'

  public async up () {
    this.schema.createTable(this.$tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.boolean('is_completed').defaultTo(0)
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.$tableName)
  }
}
