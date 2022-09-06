import { OrderController } from '../../presentation/controllers/order'
import { Controller } from '../../presentation/protocols/controller'

export const makeOrderController = (): Controller => {
  const orderController = new OrderController()
  return orderController
}
