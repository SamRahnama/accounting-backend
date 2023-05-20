import Route from '@ioc:Adonis/Core/Route'

export default function authRoutes() {
  Route.post('/auth/login', 'AuthController.login').as('login')
  Route.post('/auth/register', 'AuthController.register').as('register')
  Route.post('/auth/logout', 'AuthController.logout').as('logout')
  Route.post('/auth/validate', 'AuthController.validate').as('validate')
}
