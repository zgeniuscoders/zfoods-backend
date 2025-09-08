import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { CategoryService } from '#services/category_service'
import { addCategoryValidator, updateCategoryValidator } from '#validators/category'
import { UploadFileService } from '#services/upload_file_service'
import { UpdateCategory } from '#models/update_category'

@inject()
export default class CategoriesController {
  constructor(
    private categoryService: CategoryService,
    private uploadFileService: UploadFileService
  ) {}

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
    const fileName = await this.uploadFileService.upload(data.photo, 'categories')
    await this.categoryService.addCategory({
      ...data,
      photo: fileName,
    })
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

    let newData: UpdateCategory = {}
    if (data.photo !== undefined) {
      const fileName = await this.uploadFileService.upload(data.photo, 'categories')
      newData = { photo: fileName }
    }

    newData = { ...newData, name: data.name }

    await this.categoryService.updateCategory(id, newData)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const { id } = params
    await this.categoryService.deleteCategory(id)
  }
}
