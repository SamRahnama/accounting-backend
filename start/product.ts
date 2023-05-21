import Route from '@ioc:Adonis/Core/Route'

export default function productRoutes() {
  Route.resource('products', "ProductsController").apiOnly().except(['store','update'])
  Route.post('products/storage/:store', "ProductsController.storeOnStorage").as('product.store')
  Route.put('products/:product/storage/:store', "ProductsController.update").as('product.update')
}
