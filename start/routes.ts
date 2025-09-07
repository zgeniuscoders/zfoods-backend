/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const CompaniesController = () => import('#controllers/Api/companies_controller')
const AuthController = () => import('#controllers/Api/auth_controller')
const CategoriesController = () => import('#controllers/Api/categories_controller')

router
  .group(function () {
    router.post('login', [AuthController, 'login'])
    router.post('register', [AuthController, 'register'])

    router.resource('categories', CategoriesController).apiOnly().only(['index', 'show'])
    router.resource('companies', CompaniesController).apiOnly().only(['index', 'show'])

    router
      .group(function () {
        router.post('logout', [AuthController, 'logout'])

        router
          .resource('categories', CategoriesController)
          .apiOnly()
          .only(['store', 'update', 'destroy'])

        router
          .resource('companies', CompaniesController)
          .apiOnly()
          .only(['store', 'update', 'destroy'])
      })
      .use(middleware.auth())
  })
  .prefix('v1/api')
