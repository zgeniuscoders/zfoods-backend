import vine from '@vinejs/vine'
import { OrderStatusEnum } from '../enum/OrderStatusEnum.js'

export const addOrderValidator = vine.compile(
  vine.object({
    productId: vine.number().exists({ table: 'products', column: 'id' }),
    companyId: vine.number().exists({ table: 'companies', column: 'id' }),
    userId: vine.number().exists({ table: 'users', column: 'id' }),
    price: vine.number(),
    quantity: vine.number(),
  })
)

export const updateOrderValidator = vine.compile(
  vine.object({
    status: vine.string().in(Object.values(OrderStatusEnum)),
  })
)
