import { json } from 'express'

export const bodyParser = json() // Define "who" is the body parser to be used by the app (config>middlewares)
