import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { CategoryService } from '#services/category_service'
import { addCategoryValidator, updateCategoryValidator } from '#validators/add_category'

@inject()
export default class CategoriesController {
  constructor(private categoryService: CategoryService) {}

  /**
   * Display a list of resource
   */
  async index({ params }: HttpContext) {
    const { page, perPage } = params
    return await this.categoryService.getCategories(page, perPage)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(addCategoryValidator)
    await this.categoryService.addCategory(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id } = params
    return await this.categoryService.getCategory(id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const { id } = params
    const data = await request.validateUsing(updateCategoryValidator)
    await this.categoryService.updateCategory(id, data)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const { id } = params
    await this.categoryService.deleteCategory(id)
  }
}
