import { LogMongoFileRepository } from '../../infra/log/WinstonLogger'
import { badRequest, ok } from '../helpers/http-helper'
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
      const logger = new LogMongoFileRepository()
      const error = new Error(reqValidationResult.error)

      await logger.logError(error.stack)
      return badRequest(error)
    } else {
      return ok('Everything went okay')
    }
  }
}
