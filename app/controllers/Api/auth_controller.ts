import { AuthService } from '#services/auth_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { AuthenticationResponseEnum } from '../../enum/authentication_response_enum.js'
import { loginValidator, registerValidator } from '#validators/auth'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async login({ request }: HttpContext) {
    const data = await request.validateUsing(loginValidator)
    return await this.authService.login(data)
  }

  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    await this.authService.register(data)
    return this.authService.login({ email: data.email, password: data.password })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    const res = await this.authService.logout(user, token)

    switch (res) {
      case AuthenticationResponseEnum.TokenDeleted:
        return response.ok({
          message: 'Vous êtes maitenant deconnecter',
        })
        break
      case AuthenticationResponseEnum.TokenNotFound:
        return response.forbidden({
          message:
            "Vous n'avez pas droit de vous deconnecter avec cette compte car vous ne disposer pas de token",
        })
        break
      default:
    }
  }
}
