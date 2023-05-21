import Category from 'App/Models/Category'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const CategoryFactory = Factory.define(Category, ({faker}) => {
  return {
    name: faker.name.jobType()
  }
}).relation('parent', () => CategoryFactory).build()
