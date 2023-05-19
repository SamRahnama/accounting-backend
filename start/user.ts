import Route from '@ioc:Adonis/Core/Route'

export default function userRoutes() {
  Route.resource('users', "UsersController").apiOnly()
}
