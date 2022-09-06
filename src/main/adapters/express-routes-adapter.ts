import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest } from '../../presentation/protocols/http'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  /*
    FUNCTION BEHAVIOR:
      - instantiates an HttpRequest with the request body data
      - calls the controller's handle method and stores its return as a response
      - if the return expresses success, it returns it in the body of the response : otherwise it returns an error whose content is the message of the body of the return
  */
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
    }
  }
}
