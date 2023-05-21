import Product from 'App/Models/Product'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Product, ({ faker }) => {
  return {
    name: faker.internet.avatar(),
    description: faker.lorem.paragraphs(2),

  }
}).build()
