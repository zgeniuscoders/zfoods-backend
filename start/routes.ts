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
const AuthController = () => import('#controllers/Api/auth_controller')
const CategoriesController = () => import('#controllers/Api/categories_controller')

router
  .group(function () {
    router.post('login', [AuthController, 'login'])
    router.post('register', [AuthController, 'register'])

    router.resource('categories', CategoriesController).apiOnly().except(['store', 'update'])

    router
      .group(function () {
        router.post('logout', [AuthController, 'logout'])

        router.post('categories', [CategoriesController, 'update'])
        router.put('categories', [CategoriesController, 'update'])
      })
      .use(middleware.auth())
  })
  .prefix('v1/api')
