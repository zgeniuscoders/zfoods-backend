import Category from '#models/category'
import { AddCategory } from '#models/add_category'
import { UpdateCategory } from '#models/update_category'

export class CategoryService {
  // Your code here

  async getCategories(page: number, perPage: number) {
    return Category.query().withCount('products').paginate(page, perPage)
  }

  async getCategory(id: number) {
    return await Category.query().preload('products').where('id', id).firstOrFail()
  }

  async addCategory(data: AddCategory) {
    await Category.create(data)
  }

  async updateCategory(id: number, data: UpdateCategory) {
    await Category.query().where({ id: id }).update(data)
  }

  async deleteCategory(id: number) {
    const cat = await this.getCategory(id)
    await cat.delete()
  }
}
