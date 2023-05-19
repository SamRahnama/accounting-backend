import Route from '@ioc:Adonis/Core/Route'

export default function categoryRoutes() {
  Route.resource('categories', "CategoriesController").apiOnly()
  Route.get('/categories/children/:id', 'CategoriesController.children').as('category.children')
}
