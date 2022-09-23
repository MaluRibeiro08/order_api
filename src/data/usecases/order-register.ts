import { RegistrateOrder, RegistrateOrderModel } from '../../domain/usecases/order-register'
import { ValidateItems } from '../../domain/usecases/validate-items'

import { RequestConsummator } from '../../presentation/protocols/requestConsummator'

export class OrderRegister implements RegistrateOrder {
  private readonly itemsValidator: ValidateItems
  private readonly requestConsummator: RequestConsummator

  constructor (itemsValidator: ValidateItems, requestConsummator: RequestConsummator) {
    this.itemsValidator = itemsValidator
    this.requestConsummator = requestConsummator
  }

  async registrate (orderData: RegistrateOrderModel): Promise<boolean> {
    // Items Validation
    const { items } = orderData
    await this.itemsValidator.validate(items)

    // Request consummation
    const saleData = await this.requestConsummator.saleRegister(JSON.stringify(orderData)) // Registrate the customer if necessary and then registrate the sale | Call other service (delivery info)
    return await this.requestConsummator.saleNotifier(saleData.toString())// Notify customer about the sale registration
  }
}
