import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { OrderService } from '#services/order_service'
import { addOrderValidator, updateOrderValidator } from '#validators/order'
import { OrderStatusEnum } from '../../enum/OrderStatusEnum.js'

@inject()
export default class OrdersController {
  constructor(private orderService: OrderService) {}

  /**
   * Display a list of resource
   */
  async getUserOrders({ params }: HttpContext) {
    const { id, page, perPage } = params
    return this.orderService.getUserOrders(id, page, perPage)
  }

  async getCompanyOrders({ params }: HttpContext) {
    const { id, page, perPage } = params
    return this.orderService.getCompanyOrders(id, page, perPage)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(addOrderValidator)
    await this.orderService.addOrder({
      ...data,
      status: OrderStatusEnum.PADDING,
    })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id } = params
    return this.orderService.getOrder(id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const { id } = params
    const data = await request.validateUsing(updateOrderValidator)
    await this.orderService.updateOrder(id, data)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const { id } = params
    await this.orderService.deleteOrder(id)
  }
}
