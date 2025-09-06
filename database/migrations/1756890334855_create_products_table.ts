import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('company_id').unsigned().references('companies.id').onDelete('cascade')
      table.integer('category_id').unsigned().references('categories.id').onDelete('cascade')
      table.string('name')
      table.double('price')
      table.string('description')
      table.string('photo')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
