import express from 'express'

// Express package instantiation
const app = express()

// App configuration
app.use(express.json()) // Parse body to json to deal with it

// Server initialization
app.listen(5050, () => console.log('Server runing at http://localhost:5050'))
