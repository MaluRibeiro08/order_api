import express from 'express'

// Express package instantiation
const app = express()

// App configuration
app.use(express.json()) // Parse body to json to deal with it

export default app
