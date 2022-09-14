import { badRequest, ok } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { RequestValidator } from '../protocols/requestValidator'
import { ValidateItems } from '../../domain/usecases/validate-items'

export class OrderController implements Controller {
  private readonly requestValidator: RequestValidator
  private readonly validateItems: ValidateItems

  constructor (requestValidator: RequestValidator, validateItems: ValidateItems) { // No construtor, nós injetamos as dependências
    this.requestValidator = requestValidator
    this.validateItems = validateItems
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const reqValidationResult = await this.requestValidator.isValid(httpRequest.body)
    if (!reqValidationResult.result) {
      return badRequest(new Error(reqValidationResult.error))
    }

    const items = httpRequest.body.items
    const validItems = await this.validateItems.validate(items)
    if (validItems.length !== items.length) {
      return badRequest(new Error('Invalid item(s) provided'))
    }
    return ok('Everything went okay')
  }
}
