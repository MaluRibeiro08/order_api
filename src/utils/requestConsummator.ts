import { RequestConsummator } from '../presentation/protocols/requestConsummator'
import { RabbitmqServer } from './rabbitmq/rabbitmq_server'

export class RabbitRequestConsummator implements RequestConsummator {
  constructor (private readonly rabbitMqServer: RabbitmqServer) {}

  async startServer (): Promise<void> {
    await this.rabbitMqServer.start()
  }

  async saleRegister (costumerItemsData: any): Promise<boolean> {
    return await this.rabbitMqServer.publishInExchange('amq.direct', 'sale_register', costumerItemsData)
  }

  async saleNotifier (saleData: any): Promise<boolean> {
    return await this.rabbitMqServer.publishInExchange('amq.direct', 'sale_notifier', saleData)
  }

  async saleDeliveryRegister (saleAddresData: any): Promise<boolean> {
    return await this.rabbitMqServer.publishInExchange('amq.direct', 'sale_delivery_register', saleAddresData)
  }
}
