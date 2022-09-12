import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import winston, { format } from 'winston'

export class LogMongoFileRepository implements LogErrorRepository {
  private readonly logConfiguration = {
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.json()
    ),
    transports: [
      new winston.transports.File({
        filename: 'src/infra/log/logs.log'
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
