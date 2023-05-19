import Route from '@ioc:Adonis/Core/Route'

export default function paymentRoutes() {
  Route.resource('loans', "LoansController").apiOnly()
}
