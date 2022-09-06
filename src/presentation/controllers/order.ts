import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class OrderController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await new Promise<HttpResponse>(resolve => resolve({
      statusCode: 200,
      body: 'teste'
    }))
  }
}
