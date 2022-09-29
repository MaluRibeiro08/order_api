import { RegistrateOrder, RegistrateOrderModel } from '../../domain/usecases/order-register'
import { ValidateItems } from '../../domain/usecases/validate-items'
import { badRequest, ok } from '../../presentation/helpers/http-helper'
import { HttpResponse } from '../../presentation/protocols/http'

import { RequestConsummator } from '../../presentation/protocols/requestConsummator'

export class OrderRegister implements RegistrateOrder {
  private readonly itemsValidator: ValidateItems
  private readonly requestConsummator: RequestConsummator

  constructor (itemsValidator: ValidateItems, requestConsummator: RequestConsummator) {
    this.itemsValidator = itemsValidator
    this.requestConsummator = requestConsummator
  }

  async registrate (orderData: RegistrateOrderModel): Promise<HttpResponse> {
    // Items Validation
    const { items } = orderData
    const itemsValidationResult = await this.itemsValidator.validate(items)
    if (!itemsValidationResult) return badRequest(new Error('Invalid item(s) provided'))

    // Request consummation
    await this.requestConsummator.saleRegister(JSON.stringify(orderData)) // Registrate the customer if necessary and then registrate the sale | Call other service (delivery info)
    const notificationData = {
      customer: orderData.customer,
      sale: {
        dateTime: new Date(Date.now())
      }
    }
    await this.requestConsummator.saleNotifier(JSON.stringify(notificationData))// Notify customer about the sale registration
    return ok('We have received your order successfully!')
  }
}
