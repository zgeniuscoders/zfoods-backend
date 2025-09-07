import { Login } from '#models/login'
import { Register } from '#models/register'
import User from '#models/user'
import { AuthenticationResponseEnum } from '../enum/authentication_response_enum.js'

export class AuthService {
  async attemptLogin(user: User) {
    return await User.accessTokens.create(user)
  }

  async login(data: Login) {
    const user = await User.verifyCredentials(data.email, data.password)
    return this.attemptLogin(user)
  }

  async register(data: Register) {
    return await User.create(data)
  }

  async forgotPassword() {}

  async resetPassword() {}

  async logout(user: User, token: string | number | BigInt | undefined) {
    if (!token) {
      return AuthenticationResponseEnum.TokenNotFound
    }

    await User.accessTokens.delete(user, token)

    return AuthenticationResponseEnum.TokenDeleted
  }
}
