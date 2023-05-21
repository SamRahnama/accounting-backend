import Route from '@ioc:Adonis/Core/Route'

export default function storeRoutes() {
  Route.resource('/stores', 'StoresController').as('stores').apiOnly()
}
