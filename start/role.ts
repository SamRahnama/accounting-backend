import Route from '@ioc:Adonis/Core/Route'

export default function roleRoutes() {
  Route.resource('roles', "RolesController").apiOnly()
}
