/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const CategoriesController = () => import('#controllers/Api/categories_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(function () {
    router.resource('categories', CategoriesController)
  })
  .prefix('v1/api')
