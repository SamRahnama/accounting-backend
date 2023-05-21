import Roles from 'App/Models/Role'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Roles, ({ faker }) => {
  return {
    name: faker.name.jobTitle(),
    label:  faker.name.jobTitle()
  }
}).build()
