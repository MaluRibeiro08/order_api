import { Connection, Channel, connect, Message } from 'amqplib'

export class RabbitmqServer {
  private conn: Connection
  private channel: Channel

  constructor (private readonly uri: string) {}

  async start (): Promise<void> {
    this.conn = await connect(this.uri)
    this.channel = await this.conn.createChannel()
  }

  // envia mensagens à filas
  async publishInQueue (queue: string, message: string): Promise<boolean> {
    return this.channel.sendToQueue(queue, Buffer.from(message))
  }

  // consome mensagens da fila
  async consume (queue: string, callback: (message: Message) => void): Promise<any> {
    return await this.channel.consume(queue, (message) => {
      callback(message)
      this.channel.ack(message)
    })
  }

  // envia mensagens à exchanges
  async publishInExchange (exchange: string, routingKey: string, message: string): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message))
  }
}
