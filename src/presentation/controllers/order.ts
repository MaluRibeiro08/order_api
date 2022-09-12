import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { RequestValidator } from '../protocols/requestValidator'

export class OrderController implements Controller {
  private readonly requestValidator: RequestValidator

  constructor (requestValidator: RequestValidator) { // No construtor, nós injetamos as dependências
    this.requestValidator = requestValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const reqValidationResult = await this.requestValidator.isValid(httpRequest.body)
    if (!reqValidationResult.result) {
      return {
        statusCode: 400,
        body: reqValidationResult.error
      }
    } else {
      return {
        statusCode: 200,
        body: 'Everything went okay'
      }
    }
  }
}
