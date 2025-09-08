import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Company from '#models/company'
import OrderItem from '#models/order_item'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare companyId: number

  @column()
  declare status: string

  @column()
  declare price: number

  @belongsTo(() => User)
  declare user: relations.BelongsTo<typeof User>

  @belongsTo(() => Company)
  declare company: relations.BelongsTo<typeof Company>

  @hasMany(() => OrderItem)
  declare items: relations.HasMany<typeof OrderItem>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
