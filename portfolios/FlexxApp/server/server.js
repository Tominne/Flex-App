const express = require('express')
const app = express()
const thoughtRoutes = require('./routes/thoughtRoutes')
const cors = require('cors')

const PORT = process.env.PORT || 3000

//middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: '*',
  })
)
app.use(express.json())
app.use('/api', thoughtRoutes) // Parse JSON requests

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
