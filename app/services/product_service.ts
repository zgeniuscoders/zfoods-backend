import Product from '#models/product'
import { AddProduct } from '#models/add_product'
import { UpdateProduct } from '#models/update_product'

export class ProductService {
  getProducts(page: number, perPage: number) {
    return Product.query().preload('company').preload('category').paginate(page, perPage)
  }

  getProduct(id: number) {
    return Product.query().preload('company').preload('category').where({ id: id }).firstOrFail()
  }

  async addProduct(data: AddProduct) {
    await Product.create(data)
  }

  async updateProduct(id: number, data: UpdateProduct) {
    await Product.query().where({ id: id }).update(data)
  }

  async deleteProduct(id: number) {
    const p = await Product.findOrFail(id)
    await p.delete()
  }
}
