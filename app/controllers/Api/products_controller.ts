import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { ProductService } from '#services/product_service'
import { addProductValidator, updateProductValidator } from '#validators/product'
import { UploadFileService } from '#services/upload_file_service'
import { UpdateProduct } from '#models/update_product'

@inject()
export default class ProductsController {
  constructor(
    private productService: ProductService,
    private uploadFileService: UploadFileService
  ) {}

  /**
   * Display a list of resource
   */
  async index({ params }: HttpContext) {
    const { page, perPage } = params
    return await this.productService.getProducts(page, perPage)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(addProductValidator)

    const fileName = await this.uploadFileService.upload(data.photo, 'products')

    await this.productService.addProduct({
      ...data,
      photo: fileName,
    })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id } = params
    return this.productService.getProduct(id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const { id } = params
    const data = await request.validateUsing(updateProductValidator)

    let newData: UpdateProduct = {}
    if (data.photo) {
      const fileName = await this.uploadFileService.upload(data.photo, 'products')
      newData = { ...data, photo: fileName }
    }

    await this.productService.updateProduct(id, newData)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const { id } = params
    await this.productService.deleteProduct(id)
  }
}
