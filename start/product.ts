import Route from '@ioc:Adonis/Core/Route'

export default function productRoutes() {
  Route.resource('products', "ProductsController").apiOnly()
}
