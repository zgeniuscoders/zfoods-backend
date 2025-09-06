import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Company from '#models/company'
import * as relations from '@adonisjs/lucid/types/relations'
import Order from '#models/order'
import Category from '#models/category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare categoryId: number

  @column()
  declare companyId: number

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare description: string

  @column()
  declare photo: string

  @belongsTo(() => Category)
  declare category: relations.BelongsTo<typeof Category>

  @belongsTo(() => Company)
  declare company: relations.BelongsTo<typeof Company>

  @hasMany(() => Order)
  declare orders: relations.HasMany<typeof Order>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
