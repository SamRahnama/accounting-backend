import Order from 'App/Models/Order'
import Factory from '@ioc:Adonis/Lucid/Factory'
import {OrderTypes} from 'App/Enums/order.enum'

export const OrderFactory = Factory.define(Order, ({faker}) => {
  return {
    type: OrderTypes[faker.datatype.number({min: 0, max: 1})],
    totalPrice: faker.datatype.number({min:100}),

  }
}).build()
