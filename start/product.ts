import Route from '@ioc:Adonis/Core/Route'

export default function productRoutes() {
  Route.post('products/storage/:store', "ProductsController.storeOnStorage").as('product.store')
  Route.resource('products', "ProductsController").apiOnly().except(['store'])
}
