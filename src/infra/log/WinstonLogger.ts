import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import winston, { format } from 'winston'
import 'winston-mongodb'

export class LogMongoFileRepository implements LogErrorRepository {
  private readonly logConfiguration = {
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.json()
    ),
    transports: [
      new winston.transports.File({
        filename: 'src/infra/log/logs.log'
      }),
      new winston.transports.MongoDB({
        db: 'mongodb://localhost:27017/order-api',
        options: {
          useUnifiedTopology: true
        },
        collection: 'request_validation_error_logs'
      })
    ]
  }

  private readonly logger = winston.createLogger(this.logConfiguration)

  async logError (stack: string): Promise<void> {
    this.logger.log({
      message: stack,
      level: 'error'
    })
  }
}
