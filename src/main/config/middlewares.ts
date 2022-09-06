import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser' // Pega do index

export default (app: Express): void => {
  app.use(bodyParser) // Give to app the body parser middleware defined at 'middlewares/body-parser.ts'
}
