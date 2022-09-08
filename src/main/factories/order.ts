import { OrderController } from '../../presentation/controllers/order'
import { Controller } from '../../presentation/protocols/controller'
import { YupRequestValidator } from '../../utils/requestValidator'

export const makeOrderController = (): Controller => {
  const requestValidator = new YupRequestValidator()
  const orderController = new OrderController(requestValidator)
  return orderController
}
