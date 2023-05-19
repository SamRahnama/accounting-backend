import Route from '@ioc:Adonis/Core/Route'

export default function orderRoutes() {
  Route.resource('orders', "OrdersController").apiOnly()
}
