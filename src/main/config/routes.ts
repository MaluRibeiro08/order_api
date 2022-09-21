import { Express, Router } from 'express'
import defineOrderRoutes from '../routes/registrate-order-routes'

export default (app: Express): void => {
  /*
    FUNCTION BEHAVIOR:
    - instantiate a router
    - through the defineOrderRoutes function, assign new routes to that router
    - assigns to the app that came as a parameter the router with its routes defined
  */

  const router = Router()
  defineOrderRoutes(router)

  app.use('/api', router)
}
