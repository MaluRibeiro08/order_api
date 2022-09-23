import { badRequest, ok } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { RequestValidator } from '../protocols/requestValidator'
import { RegistrateOrder } from '../../domain/usecases/order-register'

export class OrderController implements Controller {
  private readonly orderRegister: RegistrateOrder
  private readonly requestValidator: RequestValidator

  constructor (requestValidator: RequestValidator, orderRegister: RegistrateOrder) { // No construtor, nós injetamos as dependências
    this.requestValidator = requestValidator
    this.orderRegister = orderRegister
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    // Req validation
    const reqValidationResult = await this.requestValidator.isValid(httpRequest.body)
    if (!reqValidationResult.result) {
      return badRequest(new Error(reqValidationResult.error))
    }

    await this.orderRegister.registrate(httpRequest.body) // If something goes wrong, it will throw
    return ok('Everything went okay')
  }
}
