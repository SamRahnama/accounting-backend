import Route from '@ioc:Adonis/Core/Route'

export default function paymentRoutes() {
  Route.resource('payments', "PaymentsController").apiOnly()
}
