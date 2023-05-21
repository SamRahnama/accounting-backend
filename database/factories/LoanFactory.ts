import Loan from 'App/Models/Loan'
import Factory from '@ioc:Adonis/Lucid/Factory'
import {DateTime} from 'luxon'

export const LoanFactory = Factory.define(Loan, ({faker}) => {
  return {
    profit: parseInt(faker.random.numeric(100)),
    prepayment: parseInt(faker.random.numeric()),
    loanMonth: parseInt(faker.random.numeric(11)),
    loanEndDate: DateTime.fromJSDate(faker.date.past(2022)),
    loanStartDate: DateTime.fromJSDate(faker.date.future(2024)),
    paidAmount: parseInt(faker.random.numeric(10000))
  }
}).build()

