import Category from 'App/Models/Category'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Category, ({ faker }) => {
  return {
    name: faker.name.jobType()
  }
}).build()
