import { LogMongoFileRepository } from '../../infra/log/WinstonLogger'
import { OrderController } from '../../presentation/controllers/order'
import { Controller } from '../../presentation/protocols/controller'
import { YupRequestValidator } from '../../utils/requestValidator'
import { LogControllerDecorator } from '../decorators/log'

export const makeOrderController = (): Controller => {
  const requestValidator = new YupRequestValidator()
  const orderController = new OrderController(requestValidator)
  const logMongoFileRepository = new LogMongoFileRepository()
  return new LogControllerDecorator(orderController, logMongoFileRepository)
}
