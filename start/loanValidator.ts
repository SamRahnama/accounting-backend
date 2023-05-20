import {validator} from "@ioc:Adonis/Core/Validator"
import {PaymentTypes} from "App/Enums/payments.enum"
import Payment from "App/Models/Payment"
import Logger from '@ioc:Adonis/Core/Logger'

validator.rule('onlyOnLoanPayment', async (value, _, runtimeOptions) => {
  const p = await Payment.findOrFail(value)
  await p.load('loan')
  if (p.type != PaymentTypes.LOAN) {
    Logger.info("error")
    runtimeOptions.errorReporter.report(
      runtimeOptions.pointer,
      'onlyOnLoanPayment',
      'onlyOnLoanPayment validation failed',
      runtimeOptions.arrayExpressionPointer
    )
  }
}, () => {
  return {
    async: true
  }
})
