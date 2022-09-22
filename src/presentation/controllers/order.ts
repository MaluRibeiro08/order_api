import { badRequest, ok } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { RequestValidator } from '../protocols/requestValidator'
import { ValidateItems } from '../../domain/usecases/validate-items'
import { RequestConsummator } from '../protocols/requestConsummator'

export class OrderController implements Controller {
  private readonly requestValidator: RequestValidator
  private readonly requestConsummator: RequestConsummator
  private readonly validateItems: ValidateItems

  constructor (requestValidator: RequestValidator, validateItems: ValidateItems, requestConsummator: RequestConsummator) { // No construtor, nós injetamos as dependências
    this.requestValidator = requestValidator
    this.requestConsummator = requestConsummator
    this.validateItems = validateItems
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    // Req validation
    const reqValidationResult = await this.requestValidator.isValid(httpRequest.body)
    if (!reqValidationResult.result) {
      return badRequest(new Error(reqValidationResult.error))
    }

    // Items Validation
    const items = httpRequest.body.items
    const validItems = await this.validateItems.validate(items)
    if (validItems.length !== items.length) {
      return badRequest(new Error('Invalid item(s) provided'))
    }

    // Request consummation
    const saleData = await this.requestConsummator.saleRegister(JSON.stringify(httpRequest.body)) // Registrate the customer if necessary and then registrate the sale | Call other service (delivery info)
    await this.requestConsummator.saleNotifier(saleData.toString())// Notify customer about the sale registration

    return ok('Everything went okay')
  }
}
