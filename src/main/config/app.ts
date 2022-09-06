import express from 'express'
import setupMiddlewares from './middlewares'

// Express package instantiation
const app = express()

// App configuration
setupMiddlewares(app) // function from 'config/middlewares.ts' that configurate the middlewares app should use

export default app
