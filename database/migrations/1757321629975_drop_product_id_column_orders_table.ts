import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('product_id')
      table.dropColumn('product_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
