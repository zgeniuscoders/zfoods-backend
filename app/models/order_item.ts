import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import Order from '#models/order'
import Product from '#models/product'

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column()
  declare orderId: number

  @column()
  declare quantity: number

  @column()
  declare price: number

  @belongsTo(() => Order)
  declare order: relations.BelongsTo<typeof Order>

  @belongsTo(() => Product)
  declare product: relations.BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
