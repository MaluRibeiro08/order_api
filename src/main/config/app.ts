import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

// Express package instantiation
const app = express()

// App configuration
setupMiddlewares(app) // function from 'config/middlewares.ts' that configurate the middlewares app should use
setupRoutes(app) // function from 'config/routes.ts' that assigns the routes the app should look for

export default app
