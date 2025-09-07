import Company from '#models/company'
import { AddCompany } from '#models/add_company'
import { UpdateCompany } from '#models/update_company'

export class CompanyService {
  async getCompanies(page: number, perPage: number) {
    return await Company.query().withCount('products').paginate(page, perPage)
  }

  async getCompany(id: number) {
    return await Company.query().preload('products').where({ id: id }).firstOrFail()
  }

  async addCompany(data: AddCompany) {
    await Company.create(data)
  }

  async updateCompany(id: number, data: UpdateCompany) {
    await Company.query().where({ id: id }).update(data)
  }

  async deleteCompany(id: number) {
    const comp = await Company.findOrFail(id)
    await comp.delete()
  }
}
