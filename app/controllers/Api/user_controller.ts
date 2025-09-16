import { UserService } from '#services/user_service'
import { updateUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserController {
  constructor(private userService: UserService) {}

  async index() {}

  async show({ params }: HttpContext) {
    const { id } = params
    return await this.userService.getUser(id)
  }

  async getCurrentUser({ auth, response }: HttpContext) {
    try {
      const userId = auth.user?.id
      if (!userId) {
        return response.forbidden({ error: "vous n'avez pas le droit d'acceder a cette requête" })
      }
      return await this.userService.getUser(userId)
    } catch (e) {
      return response.internalServerError({ error: e })
    }
  }

  async update({ params, request }: HttpContext) {
    const { id } = params
    const data = await request.validateUsing(updateUserValidator)
    await this.userService.updateUser(id, data)
  }

  async destroy({ params }: HttpContext) {
    const { id } = params
    await this.userService.deleteUser(id)
  }
}
