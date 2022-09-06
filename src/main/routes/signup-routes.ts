import { Router } from 'express'
import { makeOrderController } from '../factories/order'
import { adaptRoute } from '../adapters/express-routes-adapter'

export default (router: Router): void => {
  /*
    function behavior:
    - receives a router and assigns it some routes and the way to handle them
  */

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/order', adaptRoute(makeOrderController()))
}
