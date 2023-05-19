import Route from '@ioc:Adonis/Core/Route'

export default function brandRoutes() {
    Route.resource('brands', "BrandsController").apiOnly()
}
