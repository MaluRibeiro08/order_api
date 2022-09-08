import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { RequestValidator } from '../protocols/requestValidator'

export class OrderController implements Controller {
  private readonly requestValidator: RequestValidator

  constructor (requestValidator: RequestValidator) { // No construtor, nós injetamos as dependências
    this.requestValidator = requestValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: await this.requestValidator.isValid(httpRequest.body)
    }

    // return await new Promise<HttpResponse>(resolve => resolve({
    //   statusCode: 200,
    //   body: 'teste'
    // }))
  }
}
