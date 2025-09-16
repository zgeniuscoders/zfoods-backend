import { UpdateUser } from '#models/update_user'
import User from '#models/user'

export class UserService {
  async getUsers(page: number, perPage: number) {
    return User.query().paginate(page, perPage)
  }

  async getUser(id: number) {
    return User.findOrFail(id)
  }

  async updateUser(id: number, data: UpdateUser) {
    await User.query().where({ id: id }).update(data)
  }

  async deleteUser(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
  }
}
