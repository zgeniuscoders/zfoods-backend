import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { CompanyService } from '#services/company_service'
import { addCompanyValidator, updateCompanyValidator } from '#validators/company'

@inject()
export default class CompaniesController {
  constructor(private companyService: CompanyService) {}

  async index({ params }: HttpContext) {
    const { page, perPage } = params
    return await this.companyService.getCompanies(page, perPage)
  }

  async show({ params }: HttpContext) {
    const { id } = params
    return await this.companyService.getCompany(id)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(addCompanyValidator)
    await this.companyService.addCompany(data)
  }

  async update({ params, request }: HttpContext) {
    const { id } = params
    const data = await request.validateUsing(updateCompanyValidator)
    await this.companyService.updateCompany(id, data)
  }

  async destroy({ params }: HttpContext) {
    const { id } = params
    await this.companyService.deleteCompany(id)
  }
}
