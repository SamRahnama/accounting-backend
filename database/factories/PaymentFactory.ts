import Payment from 'App/Models/Payment'
import Factory from '@ioc:Adonis/Lucid/Factory'
import {PaymentTypes} from 'App/Enums/payments.enum'
import {LoanFactory} from './LoanFactory'

export const PaymentFactory = Factory.define(Payment, ({faker}) => {
  return {
    type: PaymentTypes[faker.random.numeric(1)]
  }
}).relation('loan', ()=> LoanFactory).build()

