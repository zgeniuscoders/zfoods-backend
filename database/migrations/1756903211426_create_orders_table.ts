import { BaseSchema } from '@adonisjs/lucid/schema'
import { OrderStatusEnum } from '../../app/enum/OrderStatusEnum.js'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned().references('products.id').onDelete('cascade')
      table.integer('user_id').unsigned().references('users.id').onDelete('cascade')
      table.integer('quantity')
      table.double('price')
      table.enum('status', Object.values(OrderStatusEnum)).defaultTo(OrderStatusEnum.PADDING)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
