import Category from '#models/category'

export class CategoryService {
  // Your code here

  async getCategories(page: number, perPage: number) {
    return Category.query().withCount('products').paginate(page, perPage)
  }

  async getCategory(id: number) {
    return await Category.query().preload('products').where('id', id).firstOrFail()
  }

  async addCategory(data: { name: string; photo: string }) {
    await Category.create(data)
  }

  async updateCategory(id: number, data: { name: string; photo: string }) {
    Category.query().where({ id: id }).update(data)
  }

  async deleteCategory(id: number) {
    const cat = await this.getCategory(id)
    await cat.delete()
  }
}
