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
const OrdersController = () => import('#controllers/Api/orders_controller')

const ProductsController = () => import('#controllers/Api/products_controller')
const CompaniesController = () => import('#controllers/Api/companies_controller')
const AuthController = () => import('#controllers/Api/auth_controller')
const CategoriesController = () => import('#controllers/Api/categories_controller')

router
  .group(function () {
    router.post('login', [AuthController, 'login'])
    router.post('register', [AuthController, 'register'])

    router.resource('categories', CategoriesController).apiOnly().only(['index', 'show'])
    router.resource('companies', CompaniesController).apiOnly().only(['index', 'show'])
    router.resource('products', ProductsController).apiOnly().only(['index', 'show'])

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

        router
          .resource('products', ProductsController)
          .apiOnly()
          .only(['store', 'update', 'destroy'])

        router.resource('orders', OrdersController).apiOnly().except(['index'])
        router.get('users/:id/orders', [OrdersController, 'getUserOrders'])
        router.get('companies/:id/orders', [OrdersController, 'getCompanyOrders'])
      })
      .use(middleware.auth())
  })
  .prefix('v1/api')
