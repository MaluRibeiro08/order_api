import { LogMongoFileRepository } from '../../infra/log/WinstonLogger'
import { OrderController } from '../../presentation/controllers/order'
import { Controller } from '../../presentation/protocols/controller'
import { YupRequestValidator } from '../../utils/requestValidator'
import { LogControllerDecorator } from '../decorators/log'
import { ItemsMySQLRepository } from '../../infra/db/mysql/items-repository/items-repository'
import { DbValidateItems } from '../../data/db-validate-items'

export const makeOrderController = (): Controller => {
  const requestValidator = new YupRequestValidator()
  const itemsMySQLRepository = new ItemsMySQLRepository()
  const dbValidateItems = new DbValidateItems(itemsMySQLRepository)
  const orderController = new OrderController(requestValidator, dbValidateItems)
  const logMongoFileRepository = new LogMongoFileRepository()
  return new LogControllerDecorator(orderController, logMongoFileRepository)
}
