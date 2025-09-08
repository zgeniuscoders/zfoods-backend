import Order from '#models/order'
import { AddOrder } from '#models/add_order'
import { UpdateOrder } from '#models/update_order'
import { AddOrderItem } from '#models/add_order_item'
import OrderItem from '#models/order_item'

export class OrderService {
  async getUserOrders(userId: number, page: number, perPage: number) {
    return Order.query()
      .preload('items', (query) => {
        query.preload('product')
      })
      .where({ userId: userId })
      .paginate(page, perPage)
  }

  async getCompanyOrders(companyId: number, page: number, perPage: number) {
    return Order.query().where({ companyId: companyId }).paginate(page, perPage)
  }

  async getOrder(id: number) {
    return await Order.query()
      .preload('items', (query) => {
        query.preload('product')
      })
      .where({ id: id })
      .firstOrFail()
  }

  async addOrder(data: AddOrder) {
    return await Order.create(data)
  }

  async addOrderItem(data: AddOrderItem) {
    await OrderItem.create(data)
  }

  async updateOrder(id: number, data: UpdateOrder) {
    await Order.query().where({ id: id }).update(data)
  }

  async deleteOrder(id: number) {
    const or = await Order.findOrFail(id)
    await or.delete()
  }
}
