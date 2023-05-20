import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'
import {bind} from '@adonisjs/route-model-binding'

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

  @bind()
  public async show({}, category: Category) {
    return category
  }

  @bind()
  public async update({request}: HttpContextContract, category: Category) {
    const payload: any = request.validate(UpdateCategoryValidator)
    await category.merge(payload).save()
    return category
  }

  @bind()
  public async destroy({}, category: Category) {
    await category.delete()
    return category
  }

  @bind()
  public async children({}, category: Category) {
    await category.load('children')
    return category.toJSON()
  }
}
