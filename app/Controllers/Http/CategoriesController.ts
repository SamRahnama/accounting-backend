import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'

export default class CategoriesController {
  public async index({request}: HttpContextContract) {
    let page = request.qs().page
    let categories = await Database.from('categories').paginate(page, 8)
    return categories.toJSON()
  }

  public async store({request}: HttpContextContract) {
    const payload: any = await request.validate(CreateCategoryValidator)
    const category = await Category.create(payload)
    return category.toJSON()
  }

  public async show({request}: HttpContextContract) {
    const id = request.params().id
    const category = await Category.findOrFail(id)
    return category.toJSON()
  }

  public async update({request, params}: HttpContextContract) {
    const payload: any = request.validate(UpdateCategoryValidator)
    const category = await Category.findOrFail(params.id)
    await category.merge(payload).save()
    return category.toJSON()

  }

  public async destroy({params}: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
    return category
  }

  public async children({params}: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    await category.load('children')
    return category.toJSON()
  }
}
