import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.double('total_price')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
